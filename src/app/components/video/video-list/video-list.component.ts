import { Component } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css',
  standalone: false,
})
export class VideoListComponent {
  videos: any[] = [];
  selectedVideo?: any;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (!id) {
        console.error('Course ID is missing');
        return;
      }

      const courseId = Number(id);
      this.loadVideos(courseId);
    });
  }

  loadVideos(courseId: number) {
    this.videoService.getVideosByCourse(courseId).subscribe({
      next: (res) => {
        this.videos = res;
        this.selectedVideo = res.length > 0 ? res[0] : undefined;
      },
      error: (err) => console.error(err),
    });
  }

  selectVideo(video: any) {
    this.selectedVideo = video;
  }
}
