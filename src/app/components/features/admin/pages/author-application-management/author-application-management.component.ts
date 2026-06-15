import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/admin-services/user.service';
import {
  AuthorApplicationResponse,
  AuthorApplicationSearchParams,
} from '../../../../../models/author-application.model';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author-application-management',
  standalone: false,

  templateUrl: './author-application-management.component.html',
  styleUrl: './author-application-management.component.css',
})
export class AuthorApplicationManagementComponent implements OnInit {
  applications: AuthorApplicationResponse[] = [];

  pageNumber = 0;
  readonly PAGE_LIMIT: number = 10;
  totalPages = 0;

  username = '';
  status = '';
  loading = false;
  processing = false;

  constructor(
    private readonly userService: UserService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(resetPage: boolean = false): void {
    this.loading = true;

    if (resetPage) {
      this.pageNumber = 0;
    }

    const params: AuthorApplicationSearchParams = {
      pageNumber: this.pageNumber,
      pageLimit: this.PAGE_LIMIT,
    };

    const username = this.username.trim();

    if (username) {
      params.username = username;
    }

    if (this.status) {
      params.status = this.status;
    }

    this.userService
      .getAuthorApplications(params)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (page) => {
          this.applications = page.content;
          this.totalPages = page.totalPages;
        },
        error: () => {
          this.toastr.error('Failed to load applications');
        },
      });
  }

  approve(id: number): void {
    if (this.processing) {
      return;
    }

    Swal.fire({
      title: 'Approve Application?',
      text: 'This user will become an author.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.processing = true;

      this.userService
        .approveAuthorApplication(id)
        .pipe(
          finalize(() => {
            this.processing = false;
          }),
        )
        .subscribe({
          next: (msg) => {
            this.toastr.success(msg);
            this.loadApplications();
          },
          error: (err) => {
            this.toastr.error(err.error?.message || 'Approval failed');
          },
        });
    });
  }

  reject(id: number): void {
    if (this.processing) {
      return;
    }

    Swal.fire({
      title: 'Reject Application?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.processing = true;

      this.userService
        .rejectAuthorApplication(id)
        .pipe(
          finalize(() => {
            this.processing = false;
          }),
        )
        .subscribe({
          next: (msg) => {
            this.toastr.warning(msg);
            this.loadApplications();
          },
          error: (err) => {
            this.toastr.error(err.error?.message || 'Rejection failed');
          },
        });
    });
  }

  trackByApplicationId(index: number, item: AuthorApplicationResponse): number {
    return item.applicationId;
  }

  resetFilters(): void {
    this.username = '';
    this.status = '';
    this.loadApplications(true);
  }

  previousPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadApplications();
    }
  }

  nextPage(): void {
    if (this.pageNumber + 1 < this.totalPages) {
      this.pageNumber++;
      this.loadApplications();
    }
  }
}
