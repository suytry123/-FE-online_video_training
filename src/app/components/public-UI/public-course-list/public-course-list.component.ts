import { Component, OnInit } from '@angular/core';
import { PublicCourseService } from '../../../services/public-services/public-course.service';
import { Router } from '@angular/router';
import { CourseSummary } from '../../../models/course-summary.model';
import { UserService } from '../../../services/admin-services/user.service';
import { VideoDTO } from '../../../models/course-detail.model';
import { environment } from '../../../../environments/environment';
import { courseImageUrl } from '../../../core/utils/api-url.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-public-course-list',
  standalone: false,
  templateUrl: './public-course-list.component.html',
  styleUrl: './public-course-list.component.css',
})
export class PublicCourseListComponent implements OnInit {
  courses: CourseSummary[] = [];
  getImageUrl = courseImageUrl;
  isLoading = true;

  constructor(
    private courseService: PublicCourseService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (res) => {
        this.courses = res.map((course: CourseSummary) => ({
          ...course,
          liked: false,
          viewed: false,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error('Unable to load courses');
        this.isLoading = false;
      },
    });
  }

  likeCourse(course: CourseSummary): void {
    if (course.liked) {
      return;
    }

    this.courseService.likeCourse(course.id).subscribe({
      next: () => {
        course.likes++;
        course.liked = true;
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error('Failed to like course');
      },
    });
  }

  unlikeCourse(course: CourseSummary): void {
    this.courseService.unlikeCourse(course.id).subscribe({
      next: () => {
        // course.likes--;
        course.likes = Math.max(0, course.likes - 1);
        course.liked = false;
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error('Failed to unlike course');
      },
    });
  }

  goToDetail(course: CourseSummary): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return;
    }
    if (!course.viewed) {
      this.courseService.addView(course.id).subscribe({
        next: () => {
          course.views++;
          course.viewed = true;

          this.router.navigate(['/courses', course.id]);
        },
        error: (err) => {
          console.log(err);

          this.router.navigate(['/courses', course.id]);
        },
      });
    } else {
      this.router.navigate(['/courses', course.id]);
    }
  }

  trackByCourseId(index: number, course: CourseSummary): number {
    return course.id;
  }
}
