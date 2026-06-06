import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../../../services/user-service/email.service';

@Component({
  selector: 'app-user-verification-email',
  standalone: false,

  templateUrl: './user-verification-email.component.html',
  styleUrl: './user-verification-email.component.css',
})
export class UserVerificationEmailComponent implements OnInit {
  success = false;
  message = 'Verifying...';

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.message = 'Invalid verification link';
      return;
    }

    this.emailService.verifyEmail(token).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Email verified successfully!';
      },
      error: (err) => {
        this.success = false;
        this.message = err?.error?.message || 'Verification failed';
      },
    });
  }
}
