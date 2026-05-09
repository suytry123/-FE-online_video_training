import { Component, OnInit } from '@angular/core';
import { PublicCourseService } from '../../../services/public-services/public-course.service';
import { Router } from '@angular/router';
import { CourseSummary } from '../../../models/course-summary.model';

@Component({
  selector: 'app-public-course-list',
  standalone: false,
  templateUrl: './public-course-list.component.html',
  styleUrl: './public-course-list.component.css',
})
export class PublicCourseListComponent implements OnInit {
  courses: CourseSummary[] = [];

  constructor(
    private courseService: PublicCourseService,
    private router: Router,
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
      },
      error: (err) => {
        console.log(err);
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
      },
    });
  }

  unlikeCourse(course: CourseSummary): void {
    this.courseService.unlikeCourse(course.id).subscribe({
      next: () => {
        course.likes--;
        course.liked = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetail(course: CourseSummary): void {
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
}
