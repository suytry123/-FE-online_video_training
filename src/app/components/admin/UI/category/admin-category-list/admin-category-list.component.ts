import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/admin-services/category.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css'],
  standalone: false,
})
export class AdminCategoryListComponent implements OnInit {
  categories!: any[];
  // loading: boolean = false;
  totalItems: number = 0;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // let param = new HttpParams().append('pageLimit', 5);
    // this.loadCategories();
    let param = new HttpParams().append('_page', 1).append('_limit', 5);
    this.getCategories(param);
  }

  private getCategories(param: HttpParams) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No authentication token found. Please log in first.');
      this.categories = [];
      return;
    }
    this.categoryService.getCategoryList(param).subscribe(
      (res) => {
        this.categories = Array.isArray(res.list) ? res.list : [];
      },
      (err) => {
        this.categories = [];
        alert(
          'Failed to fetch categories. Please check your connection or contact admin.',
        );
        console.error('Fetch categories error:', err);
      },
    );
  }

  getCategoriesByLimit(limitCombobox: any) {
    let limit = limitCombobox.target.value;
    let param = new HttpParams().append('_limit', limit);
    this.getCategories(param);
  }

  goToCategoryForm() {
    this.router.navigate(['/admin/category/form']);
  }

  edit(categoryId: number) {
    this.router.navigate(['/admin/category/form', categoryId]);
  }

  delete(id: number): void {
    if (!id) return;

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Deleted successfully');

        let param = new HttpParams().append('_page', 1).append('_limit', 5);

        this.getCategories(param);
      },
      error: (err) => console.error(err),
    });
  }

  /*delete(id: number): void {
    if (!id) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Deleted successfully');
        this.loadCategories(); // refresh list 
      },
      error: (err) => console.error(err)
    });
  }*/

  /*loadCategories(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (res) => {
        this.categories = res.data || [];
        console.log(res);
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }*/
}
