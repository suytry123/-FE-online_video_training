import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CategoryListComponent implements OnInit {
  categories!: any[];
  loading: boolean = false;
  totalItems: number = 0;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    // let param = new HttpParams().append('pageLimit', 5);
    this.loadCategories();
    let param = new HttpParams()
    .append('_page', 1)
    .append('_limit', 5);
    this.getCategories(param);
  }

  private getCategories(param: HttpParams) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No authentication token found. Please log in first.');
      this.categories = [];
      return;
    }
    this.categoryService.getCategoryList(param).subscribe(res => {
      this.categories = Array.isArray(res.list) ? res.list : [];
    }, err => {
      this.categories = [];
      alert('Failed to fetch categories. Please check your connection or contact admin.');
      console.error('Fetch categories error:', err);
    });
  }

  getCategoriesByLimit(limitCombobox: any) {
    let limit = limitCombobox.target.value;
    let param = new HttpParams().append('_limit', limit);
    this.getCategories(param);
  }

  goToCategoryForm() {
    this.router.navigate(['category/form']);
  }

  edit(categoryId: number) {
    this.router.navigate(['category/form', categoryId]);
  }

 delete(id: number): void {
    if (!id) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Deleted successfully');
        this.loadCategories(); // refresh list 
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res.data || [];
        console.log(res);
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }

}
