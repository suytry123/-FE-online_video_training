import { Component } from '@angular/core';
import { CourseService } from '../../../../../services/admin-services/course.service';

@Component({
  selector: 'app-admin-course-trash',
  standalone: false,

  templateUrl: './admin-course-trash.component.html',
  styleUrl: './admin-course-trash.component.css',
})
export class AdminCourseTrashComponent {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadTrash();
  }

  loadTrash() {
    this.courseService.getTrash().subscribe({
      next: (res: any) => {
        this.courses = res;
      },
    });
  }

  restore(id: number) {
    this.courseService.restore(id).subscribe({
      next: () => {
        this.loadTrash();
      },
    });
  }
}
