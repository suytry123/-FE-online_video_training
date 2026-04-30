import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../../services/video.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrl: './video-form.component.css',
  standalone: false
})
export class VideoFormComponent implements OnInit {
  videoForm!: FormGroup;

  constructor( private fb: FormBuilder,
  private videoService: VideoService,
  private route: ActivatedRoute,
  private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      id: [''],
      courseId: [''],
      title: [''],
      description: [''],
    });

    // auto-fill courseId from URL
   this.route.queryParams.subscribe(params => {
      if (params['courseId']) {
        this.videoForm.patchValue({
          courseId: params['courseId']
        });
     }
    });
  }

  save(){
    this.videoService.saveVideo(this.videoForm.value).subscribe({
      next: (response) => {
        console.log('Video saved successfully:', response);
        this.toastrService.success('Video saved successfully!');
      },
      error: (error) => {
        console.error('Error saving video:', error);
        this.toastrService.error('Error saving video.');
      }
    });
  }

}
