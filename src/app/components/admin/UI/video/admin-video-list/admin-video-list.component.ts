import { Component } from '@angular/core';
import { VideoService } from '../../../../../services/admin-services/video.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-video-list',
  templateUrl: './admin-video-list.component.html',
  styleUrl: './admin-video-list.component.css',
  standalone: false,
})
export class AdminVideoListComponent {
  videos: any[] = [];
  selectedVideo?: any;
  selectedLink?: string;
  courseId!: number;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.loadVideos(Number(id));
      }
    });
  }

  loadVideos(courseId: number) {
    this.videoService.getVideosByCourse(courseId).subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : res.list;

        this.videos = data || [];

        this.selectedVideo =
          this.videos.length > 0 ? this.videos[0] : undefined;

        if (this.selectedVideo) {
          this.selectedLink = this.selectedVideo.video_link?.[0];
        }
      },
      error: (err) => console.error(err),
    });
  }

  // selectVideo(video: any) {
  //   this.selectedVideo = video;
  // }

  selectVideo(video: any) {
    this.selectedVideo = video;
    this.selectedLink = video.video_link?.[0]; // default first
  }

  goToAddVideo() {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/admin/video/form', courseId]);
  }
}
