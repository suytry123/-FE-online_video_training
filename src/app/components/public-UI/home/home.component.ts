import { Component } from '@angular/core';
import { PublicCourseService } from '../../../services/public-services/public-course.service';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  courses: any[] = [];

  constructor(private publicCourseService: PublicCourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.publicCourseService.getAllCourses().subscribe({
      next: (res: any) => {
        this.courses = res.slice(0, 3);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
