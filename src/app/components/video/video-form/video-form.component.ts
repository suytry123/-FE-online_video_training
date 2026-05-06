import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
  standalone: false,
})
export class VideoFormComponent implements OnInit {
  videoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      id: [''],
      courseId: [''],
      title: [''],
      description: [''],
      videoLink: this.fb.array([]),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) return;

      const courseId = Number(id);

      if (!isNaN(courseId)) {
        this.videoForm.patchValue({
          courseId: courseId,
        });
      }
    });
    this.addLink();
  }

  get videoLinks(): FormArray {
    return this.videoForm.get('videoLink') as FormArray;
  }

  addLink() {
    this.videoLinks.push(this.fb.control(''));
  }

  removeLink(index: number) {
    this.videoLinks.removeAt(index);
  }

  // formatUrl(url: string): string {
  //   return url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url;
  // }

  formatUrl(url: string): string {
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
    if (this.videoForm.invalid) return;
    const formValue = this.videoForm.value;
    formValue.videoLink = formValue.videoLink.map((link: string) =>
      this.formatUrl(link),
    );
    this.videoService.saveVideo(formValue).subscribe({
      next: (response) => {
        console.log('Video saved successfully:', response);
        this.toastrService.success('Video saved successfully!');
      },
      error: (error) => {
        console.error('Error saving video:', error);
        this.toastrService.error('Error saving video.');
      },
    });
  }
}
