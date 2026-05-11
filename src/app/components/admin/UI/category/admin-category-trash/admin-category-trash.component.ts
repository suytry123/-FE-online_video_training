import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../services/admin-services/category.service';

@Component({
  selector: 'app-admin-category-trash',
  standalone: false,

  templateUrl: './admin-category-trash.component.html',
  styleUrl: './admin-category-trash.component.css',
})
export class AdminCategoryTrashComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadTrash();
  }

  loadTrash(): void {
    this.categoryService.getTrash().subscribe({
      next: (res) => {
        this.categories = res;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  restore(id: number): void {
    this.categoryService.restore(id).subscribe({
      next: () => {
        this.loadTrash();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
