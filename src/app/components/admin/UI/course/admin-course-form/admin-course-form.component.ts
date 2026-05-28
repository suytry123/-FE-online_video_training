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
import { HttpParams } from '@angular/common/http';

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
  categories: any[] = [];
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
      courseDescription: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0)]],
      imageCover: [''],
    });

    this.loadCategories();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      if (!id || !/^\d+$/.test(id)) {
        return;
      }

      this.courseId = parseInt(id);

      this.courseService.getById(this.courseId).subscribe(
        (course) => {
          this.courseForm.patchValue(course);

          if (course.imageCover) {
            this.previewUrl = course.imageCover;
          }
        },
        (err) => {
          console.log(err);
        },
      );
    });
  }

  createCourse() {
    this.isSubmitted = true;
    this.courseService.saveCourse(this.courseForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        // upload image after course saved
        if (this.selectedFile) {
          this.courseService.uploadImage(res.id, this.selectedFile).subscribe({
            next: () => {
              this.isSubmitted = false;
              this.toastrService.success('Course + Image saved successfully!');

              this.resetForm();

              this.previewUrl = null;
              this.selectedFile = undefined as any;
            },

            error: (err) => {
              this.isSubmitted = false;
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
        this.isSubmitted = false;
        console.error(err);

        this.toastrService.error('Failed to save course');
      },
    });
  }

  loadCategories() {
    let params = new HttpParams().append('_page', 0).append('_limit', 100);

    this.courseService.getCategories(params).subscribe(
      (res) => {
        if (Array.isArray(res)) {
          this.categories = res;
          return;
        }

        this.categories = Array.isArray(res?.list)
          ? res.list
          : Array.isArray(res?.content)
            ? res.content
            : [];
      },
      (err) => {
        this.categories = [];
        console.log(err);
      },
    );
  }

  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.courseForm.patchValue({ categoryId: selectedCategoryId });
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

    this.previewUrl = null;

    this.selectedFile = undefined as any;
  }

  saveCourse() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    if (this.courseId) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  updateCourse() {
    this.isSubmitted = true;
    this.courseService.updateCourse(this.courseForm.value).subscribe({
      next: () => {
        // upload new image if selected
        if (this.selectedFile) {
          this.courseService
            .updateImage(this.courseId, this.selectedFile)
            .subscribe({
              next: () => {
                this.isSubmitted = false;
                this.toastrService.success(
                  'Course + Image updated successfully!',
                );
                this.previewUrl = null;
              },
              error: (err) => {
                this.isSubmitted = false;
                console.error(err);
                this.toastrService.error('Course updated but image failed');
              },
            });
        } else {
          this.isSubmitted = false;
          this.toastrService.success('Course updated successfully!');
        }
      },

      error: (err) => {
        this.isSubmitted = false;
        console.error(err);

        this.toastrService.error('Failed to update course');
      },
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
