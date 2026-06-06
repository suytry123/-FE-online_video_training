import { Component, OnInit } from '@angular/core';
import { PublicCourseService } from '../../../services/public-services/public-course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseDetail, VideoDTO } from '../../../models/course-detail.model';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-public-course-detail',
  standalone: false,

  templateUrl: './public-course-detail.component.html',
  styleUrl: './public-course-detail.component.css',
})
export class PublicCourseDetailComponent implements OnInit {
  courseId!: number;
  course?: CourseDetail;
  liked = false;
  selectedVideo!: VideoDTO;
  selectedLink: string = '';

  constructor(
    private route: ActivatedRoute,
    private publicCourseService: PublicCourseService,
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.publicCourseService.addView(this.courseId).subscribe();
    this.loadCourse(this.courseId);
  }

  loadCourse(id: number): void {
    this.publicCourseService.getCourseDetail(id).subscribe({
      next: (res) => {
        this.course = res;
        console.log(this.course);

        if (this.course.videos.length > 0) {
          this.selectedVideo = this.course.videos[0];

          this.selectedLink = this.selectedVideo.videoLink?.[0];
        }
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleLike(): void {
    if (!this.course) {
      return;
    }

    if (this.liked) {
      this.publicCourseService.unlikeCourse(this.course.id).subscribe({
        next: () => {
          this.liked = false;

          this.course!.likes--;
        },
      });
    } else {
      this.publicCourseService.likeCourse(this.course.id).subscribe({
        next: () => {
          this.liked = true;

          this.course!.likes++;
        },
      });
    }
  }

  selectVideo(video: VideoDTO): void {
    this.selectedVideo = video;

    this.selectedLink = video.videoLink?.[0];
  }
}
