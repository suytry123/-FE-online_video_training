import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: false
})
export class AdminDashboardComponent implements OnInit {
  // totalCategories = 0;
  // totalUsers = 0;

  // constructor(private categoryService: CategoryService, private userService: UserService) {}

  ngOnInit(): void {
    // const params = new HttpParams();
    // this.categoryService.getCategoryList(params).subscribe(res => {
    //   this.totalCategories = res.list ? res.list.length : res.length;
    // });
    // this.userService.getUserList().subscribe(res => {
    //   this.totalUsers = res.length;
    // });
  }
}
