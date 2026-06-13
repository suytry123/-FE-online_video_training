import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../../../services/user-service/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resend-verification',
  standalone: false,

  templateUrl: './resend-verification.component.html',
  styleUrl: './resend-verification.component.css',
})
export class ResendVerificationComponent implements OnInit {
  resendVerificationForm!: FormGroup;

  submitted = false;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.resendVerificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.resendVerificationForm.get('email');
  }

  submit(): void {
    this.submitted = true;

    if (this.resendVerificationForm.invalid) {
      return;
    }

    this.loading = true;

    this.emailService
      .resendVerificationEmail(this.resendVerificationForm.value)
      .subscribe({
        next: () => {
          this.toastr.success('Verification email sent successfully.');

          this.loading = false;
        },
        error: (err) => {
          this.loading = false;

          this.toastr.error(
            err?.error?.message || 'Failed to send verification email.',
          );
        },
      });
  }
}
