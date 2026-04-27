import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
   courses!: any[];

   constructor(private courseService: CourseService, private router: Router) {}
   
     ngOnInit(): void {
       // let param = new HttpParams().append('pageLimit', 5);
       this.loadCourses();
       let param = new HttpParams()
       .append('_page', 1)
       .append('_limit', 5);
       this.getCourses(param);
     }
   
     private getCourses(param: HttpParams) {
       const token = localStorage.getItem('token');
       if (!token) {
         alert('No authentication token found. Please log in first.');
         this.courses = [];
         return;
       }
       this.courseService.getCourseList(param).subscribe(res => {
         this.courses = Array.isArray(res.list) ? res.list : [];
       }, err => {
         this.courses = [];
         alert('Failed to fetch courses. Please check your connection or contact admin.');
         console.error('Fetch courses error:', err);
       });
     }
   
     getCoursesByLimit(limitCombobox: any) {
       let limit = limitCombobox.target.value;
       let param = new HttpParams().append('_limit', limit);
       this.getCourses(param);
     }
   
     goToCourseForm() {
       this.router.navigate(['course/form']);
     }
   
     edit(courseId: number) {
       this.router.navigate(['course/form', courseId]);
     }
   
    delete(id: number): void {
       if (!id) return;
       this.courseService.deleteCourse(id).subscribe({
         next: () => {
           console.log('Deleted successfully');
           this.loadCourses(); // refresh list 
         },
         error: (err) => console.error(err)
       });
     }
   
     loadCourses(): void {
    this.courseService.getCourseList().subscribe({
      next: (res) => {
        this.courses = res.data || [];
        console.log(res);
        console.log(this.courses);
      },
      error: (err) => console.error(err)
    });
  }
}
