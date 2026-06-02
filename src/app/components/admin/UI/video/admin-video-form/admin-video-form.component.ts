import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../../../../services/admin-services/video.service';
import { ToastrService } from 'ngx-toastr';
import { VideoDTO } from '../../../../../models/course-detail.model';

@Component({
  selector: 'app-admin-video-form',
  templateUrl: './admin-video-form.component.html',
  styleUrl: './admin-video-form.component.css',
  standalone: false,
})
export class AdminVideoFormComponent implements OnInit {
  private readonly youtubePattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/).+/;
  videoForm!: FormGroup;
  videoId?: number;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      id: [''],
      course_id: [null, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      video_link: this.fb.array([]),
    });

    this.route.paramMap.subscribe((params) => {
      const videoId = params.get('id');
      const courseId = params.get('courseId');

      // const courseId = params.get('courseId');

      if (videoId) {
        this.videoId = Number(videoId);

        this.videoService.getVideoById(this.videoId).subscribe({
          next: (video: VideoDTO) => {
            this.videoForm.patchValue({
              id: video.id,
              course_id: video.course_id ?? Number(courseId),
              title: video.title,
              description: video.description,
              video_link: [],
            });

            this.videoLinks.clear();

            video.video_link.forEach((link: string) => {
              this.videoLinks.push(this.createVideoLinkControl(link));
            });
          },
          error: () => {
            this.toastrService.error('Failed to load video');
          },
        });
      } else {
        this.videoForm.patchValue({
          course_id: Number(courseId),
        });
        this.addLink();
      }
    });
  }

  get videoLinks(): FormArray<FormControl> {
    return this.videoForm.get('video_link') as FormArray<FormControl>;
  }

  reset() {
    const course_id = Number(this.videoForm.value.course_id);

    this.videoForm.reset({
      id: '',
      course_id: course_id,
      title: '',
      description: '',
    });

    this.videoLinks.clear();
    this.addLink();
  }

  private createVideoLinkControl(value = ''): FormControl {
    return new FormControl(value, [
      Validators.required,
      Validators.pattern(this.youtubePattern),
    ]);
  }

  // addLink() {
  //   this.videoLinks.push(this.fb.control(''));
  // }

  addLink() {
    this.videoLinks.push(this.createVideoLinkControl());
  }

  removeLink(index: number) {
    // this.videoLinks.removeAt(index);
    if (this.videoLinks.length > 1) {
      this.videoLinks.removeAt(index);
    }
  }

  // formatUrl(url: string): string {
  //   return url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
  // }

  private formatUrl(url: string): string {
    if (!url) return '';

    // youtu.be/abc123
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // watch?v=abc123
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // already embed
    if (url.includes('embed/')) {
      return url;
    }

    return url;
  }

  save() {
    // if (this.videoForm.invalid) return;
    if (this.videoForm.invalid) {
      this.videoForm.markAllAsTouched();
      return;
    }
    // const formValue = this.videoForm.value;
    const videoLinks = this.videoForm.value.video_link as string[];

    const formValue: VideoDTO = {
      ...this.videoForm.value,
      course_id: Number(this.videoForm.value.course_id),
      title: this.videoForm.value.title.trim(),
      description: this.videoForm.value.description.trim(),
      video_link: videoLinks.map((link) => this.formatUrl(link)),
    };
    if (this.videoId) {
      this.videoService.updateVideo(this.videoId, formValue).subscribe({
        next: () => {
          this.toastrService.success('Video updated successfully!');
          this.router.navigate(['/admin/video/list', formValue.course_id]);
        },
        error: () => {
          this.toastrService.error('Error updating video.');
        },
      });
    } else {
      this.videoService.saveVideo(formValue).subscribe({
        next: () => {
          this.toastrService.success('Video saved successfully!');
          this.reset();
        },
        error: () => {
          this.toastrService.error('Error saving video.');
        },
      });
    }
  }
}
