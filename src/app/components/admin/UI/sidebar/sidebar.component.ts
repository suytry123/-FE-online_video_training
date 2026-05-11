import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../../services/admin-services/course.service';
import { UserService } from '../../../../services/admin-services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false

})
export class SidebarComponent {
  constructor(public userService: UserService) {}

}
