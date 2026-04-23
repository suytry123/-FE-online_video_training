import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  isSubmitted = false;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      id: [''],
      name: ['']
    });

  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     this.categoryId = parseInt(paramMap.get('id')!);
  //     this.categoryService.getById(this.categoryId).subscribe(category => {
  //       this.categoryForm.patchValue(category);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
        if (!id || !/^\d+$/.test(id)) {
          return;
        }
        
        this.categoryId = parseInt(id);
        
        this.categoryService.getById(this.categoryId).subscribe(category => {
          this.categoryForm.patchValue(category);
        }, err => {
          console.log(err);
        });
      });
    }

  createCategory() {
    this.categoryService.saveCategory(this.categoryForm.value).subscribe(res => {
      console.log(this.categoryForm.value);
      this.isSubmitted = true;
      this.toastrService.success('Category created successfully!', 'Category Created!');
      this.resetForm();
    }, err => {
      this.isSubmitted = false;
      this.toastrService.error('Failed to add category. Please check your connection or contact admin.', 'Error');
      console.error('Add category error:', err);
    });
  }

  resetForm() {
    this.categoryForm.reset();
    this.isSubmitted = false;
    // this.categoryId = null;
  }

  saveCategory() {
    if (this.categoryId) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryForm.value).subscribe(res => {
      this.isSubmitted = true;
      this.toastrService.success('Category updated successfully!', 'Category Updated!');
    }, err => {
      console.error(err);
    });
  }
}
