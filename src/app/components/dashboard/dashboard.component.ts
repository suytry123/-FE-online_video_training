import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
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
