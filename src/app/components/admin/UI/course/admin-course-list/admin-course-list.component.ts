import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../../../services/admin-services/course.service';
import { Course } from '../../../../../models/course-model';
import { courseImageUrl } from '../../../../../core/utils/api-url.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-course-list',
  templateUrl: './admin-course-list.component.html',
  styleUrl: './admin-course-list.component.css',
  standalone: false,
})
export class AdminCourseListComponent {
  courseImageUrl = courseImageUrl;
  courses: Course[] = [];
  pageSize = 5;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    // let param = new HttpParams().append('pageLimit', 5);
    // this.loadCourses();
    const param = new HttpParams()
      .append('_page', '1')
      .append('_limit', String(this.pageSize));
    this.getCourses(param);
  }

  private getCourses(param: HttpParams) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastrService.error(
        'No authentication token found. Please log in first.',
      );
      this.courses = [];
      return;
    }
    this.courseService.getCourseList(param).subscribe({
      next: (res) => {
        this.courses = Array.isArray(res.list) ? res.list : [];
      },
      error: (err) => {
        this.courses = [];
        this.toastrService.error(
          'Failed to fetch courses. Please check your connection or contact admin.',
        );
        console.error('Fetch courses error:', err);
      },
    });
  }

  /*getCoursesByLimit(limitCombobox: any) {
    let limit = limitCombobox.target.value;
    let param = new HttpParams().append('_limit', limit);
    this.getCourses(param);
  }*/

  getCoursesByLimit(limit: number) {
    this.pageSize = Number(limit);

    const param = new HttpParams()
      .append('_page', '1')
      .append('_limit', String(this.pageSize));

    this.getCourses(param);
  }

  goToVideos(courseId: number) {
    this.router.navigate(['/admin/video/list', courseId]);
  }

  goToCourseForm() {
    this.router.navigate(['/admin/course/form']);
  }

  edit(courseId: number) {
    this.router.navigate(['/admin/course/form', courseId]);
  }

  delete(id: number): void {
    if (!id) return;

    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        this.toastrService.success('Course deleted successfully');
        const param = new HttpParams()
          .append('_page', '1')
          .append('_limit', String(this.pageSize));

        this.getCourses(param);
      },
      error: (err) => {
        this.toastrService.error('Failed to delete course');
        console.error(err);
      },
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/avatars/default.jpg';
  }

  /*delete(id: number): void {
    if (!id) return;
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        console.log('Deleted successfully');
        this.loadCourses(); // refresh list
      },
      error: (err) => console.error(err),
    });
  }*/

  /*loadCourses(): void {
    this.courseService.getCourseList().subscribe({
      next: (res) => {
        this.courses = res.data || [];
        console.log(res);
        console.log(this.courses);
      },
      error: (err) => console.error(err),
    });
  }*/
}
