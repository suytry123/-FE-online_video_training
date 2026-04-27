import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
   courseForm!: FormGroup;
   isSubmitted = false;
   courseId!: number;
 
   constructor(
     private fb: FormBuilder,
     private courseService: CourseService,
     private toastrService: ToastrService,
     private route: ActivatedRoute
   ) {}

   ngOnInit() {
     this.courseForm = this.fb.group({
        categoryId: [null, Validators.required],
        name: ['', Validators.required],
        authorId: [null, Validators.required],
        price: [null, [Validators.required, Validators.min(0)]]
     });
   }

   saveCourse() {
     this.courseService.saveCourse(this.courseForm.value).subscribe({
       next: (res) => {
         this.toastrService.success('Course saved successfully!');
         console.log(res);
       },
       error: (err) => {
         this.toastrService.error('Failed to save course. Please try again.');
         console.error(err);
       }
     });
    }

    resetForm() {
      this.courseForm.reset();
    }

}
