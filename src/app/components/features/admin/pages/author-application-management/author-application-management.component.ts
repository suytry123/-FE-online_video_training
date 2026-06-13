import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/admin-services/user.service';
import { AuthorApplicationResponse } from '../../../../../models/author-application.model';

@Component({
  selector: 'app-author-application-management',
  standalone: false,

  templateUrl: './author-application-management.component.html',
  styleUrl: './author-application-management.component.css',
})
export class AuthorApplicationManagementComponent implements OnInit {
  applications: AuthorApplicationResponse[] = [];

  pageNumber = 0;
  pageLimit = 10;

  totalPages = 0;

  username = '';
  status = '';
  loading = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(resetPage: boolean = false): void {
    this.loading = true;

    if (resetPage) {
      this.pageNumber = 0;
    }

    const params: any = {
      pageNumber: this.pageNumber,
      pageLimit: this.pageLimit,
    };

    if (this.username) {
      params.username = this.username;
    }

    if (this.status) {
      params.status = this.status;
    }

    this.userService.getAuthorApplications(params).subscribe({
      next: (page) => {
        this.applications = page.content;

        this.totalPages = page.totalPages;

        this.loading = false;
      },
      error: () => {
        this.loading = false;

        this.toastr.error('Failed to load applications');
      },
    });
  }

  approve(id: number): void {
    this.userService.approveAuthorApplication(id).subscribe({
      next: (msg) => {
        this.toastr.success(msg);
        this.loadApplications();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Approval failed');
      },
    });
  }

  reject(id: number): void {
    this.userService.rejectAuthorApplication(id).subscribe({
      next: (msg) => {
        this.toastr.warning(msg);
        this.loadApplications();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Rejection failed');
      },
    });
  }
}
