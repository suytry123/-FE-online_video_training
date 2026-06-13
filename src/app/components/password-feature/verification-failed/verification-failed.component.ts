import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-failed',
  standalone: false,

  templateUrl: './verification-failed.component.html',
  styleUrl: './verification-failed.component.css',
})
export class VerificationFailedComponent {
  constructor(private router: Router) {}

  goToResendVerification(): void {
    this.router.navigate(['/resend-verification']);
  }
}
