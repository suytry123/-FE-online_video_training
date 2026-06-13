import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../../services/admin-services/user.service';

@Component({
  selector: 'app-verify-email',
  standalone: false,

  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {
  successMessage = '';
  errorMessage = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.loading = false;
      this.errorMessage = 'Verification token is missing';
      return;
    }

    this.userService.verifyEmail(token).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = response;
      },

      error: (error) => {
        this.loading = false;
        this.errorMessage =
          error?.error?.message || error?.error || 'Verification failed';
      },
    });
  }
}
