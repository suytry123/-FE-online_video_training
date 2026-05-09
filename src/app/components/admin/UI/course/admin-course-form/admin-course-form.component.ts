import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../../../services/admin-services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-course-form',
  templateUrl: './admin-course-form.component.html',
  styleUrl: './admin-course-form.component.css',
  standalone: false,
})
export class AdminCourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isSubmitted = false;
  courseId!: number;
  selectedFile!: File;
  previewUrl: any = null;

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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      authorId: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      imageCover: [''],
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
      next: (res: any) => {
        console.log(res);
        // upload image after course saved
        if (this.selectedFile) {
          this.courseService.uploadImage(res.id, this.selectedFile).subscribe({
            next: () => {
              this.toastrService.success('Course + Image saved successfully!');

              this.resetForm();

              this.previewUrl = null;
              this.selectedFile = undefined as any;
            },

            error: (err) => {
              console.error(err);

              this.toastrService.error('Course saved but image upload failed');
            },
          });
        } else {
          this.toastrService.success('Course saved successfully!');

          this.resetForm();
        }
      },

      error: (err) => {
        console.error(err);

        this.toastrService.error('Failed to save course');
      },
    });
  }

  // createCourse() {
  //   this.courseService.saveCourse(this.courseForm.value).subscribe({
  //     next: (res) => {
  //       this.toastrService.success('Course saved successfully!');
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       this.toastrService.error('Failed to save course. Please try again.');
  //       console.error(err);
  //     },
  //   });
  // }

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
  this.courseService.updateCourse(this.courseForm.value).subscribe({
    next: () => {
      // upload new image if selected
      if (this.selectedFile) {
        this.courseService
          .updateImage(this.courseId, this.selectedFile)
          .subscribe({
            next: () => {
              this.toastrService.success(
                'Course + Image updated successfully!'
              );
              this.previewUrl = null;
            },
            error: (err) => {
              console.error(err);
              this.toastrService.error(
                'Course updated but image failed'
              );
            }
          });
      } else {
        this.toastrService.success(
          'Course updated successfully!'
        );
      }
    },

    error: (err) => {

      console.error(err);

      this.toastrService.error(
        'Failed to update course'
      );
    }

  });
}

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
