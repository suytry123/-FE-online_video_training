import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
  standalone: false
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isSubmitted = false;
  courseId!: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.courseForm = this.fb.group({
      id: [''],
      categoryId: [null, [Validators.required, Validators.min(1)]],
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      authorId: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      if (!id || !/^\d+$/.test(id)) {
        return;
      }

      this.courseId = parseInt(id);

      this.courseService.getById(this.courseId).subscribe(
        (course) => {
          this.courseForm.patchValue(course);
        },
        (err) => {
          console.log(err);
        },
      );
    });
  }

  createCourse() {
    this.courseService.saveCourse(this.courseForm.value).subscribe({
      next: (res) => {
        this.toastrService.success('Course saved successfully!');
        console.log(res);
      },
      error: (err) => {
        this.toastrService.error('Failed to save course. Please try again.');
        console.error(err);
      },
    });
  }

  resetForm() {
    this.courseForm.reset();
  }

  saveCourse() {
    if (this.courseId) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  updateCourse() {
    this.courseService.updateCourse(this.courseForm.value).subscribe(
      (res) => {
        this.isSubmitted = true;
        this.toastrService.success(
          'Course updated successfully!',
          'Course Updated!',
        );
      },
      (err) => {
        console.error(err);
      },
    );
  }
}
