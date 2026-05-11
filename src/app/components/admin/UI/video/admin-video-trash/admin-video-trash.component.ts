import { Component } from '@angular/core';
import { VideoService } from '../../../../../services/admin-services/video.service';

@Component({
  selector: 'app-admin-video-trash',
  standalone: false,

  templateUrl: './admin-video-trash.component.html',
  styleUrl: './admin-video-trash.component.css',
})
export class AdminVideoTrashComponent {
  videos: any[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadTrash();
  }

  loadTrash() {
    this.videoService.getTrash().subscribe({
      next: (res: any) => {
        this.videos = Array.isArray(res) ? res : res.list || [];
      },

      error: (err) => console.error(err),
    });
  }

  restore(id: number) {
    if (confirm('Restore this video?')) {
      this.videoService.restore(id).subscribe({
        next: () => {
          this.loadTrash();
        },

        error: (err) => console.error(err),
      });
    }
  }
}
