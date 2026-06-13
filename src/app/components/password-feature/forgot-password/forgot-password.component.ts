import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/admin-services/user.service';
import { AuthService } from '../../../services/admin-services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false,
})
export class ForgotPasswordComponent implements OnInit {
  loading = false;
  forgotPasswordForm!: FormGroup;

  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    if (this.loading) return;

    this.loading = true;

    // const email = this.forgotPasswordForm.value.email.trim();
    const email = this.forgotPasswordForm.get('email')?.value?.trim() ?? '';

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.loading = false;

        this.successMessage =
          'If the email exists, a reset link has been sent.';
      },

      error: () => {
        this.loading = false;

        this.toastr.error('Something went wrong');
      },
    });
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.successMsg = '';
  //   this.errorMsg = '';
  //   if (this.forgotForm.invalid) {
  //     return;
  //   }
  //   this.userService.requestPasswordReset(this.forgotForm.value.email).subscribe({
  //     next: () => {
  //       this.otpSent = true;
  //       this.successMsg = 'If your email exists, a password reset OTP has been sent.';
  //     },
  //     error: () => {
  //       this.errorMsg = 'Failed to send OTP. Please try again.';
  //     }
  //   });
  // }

  // onOtpSubmit() {
  //   this.successMsg = '';
  //   this.errorMsg = '';
  //   if (this.otpForm.invalid) {
  //     return;
  //   }
  //   const { otp, newPassword } = this.otpForm.value;
  //   this.userService.verifyOtp(otp, newPassword).subscribe({
  //     next: () => {
  //       this.successMsg = 'Password reset successful! You can now log in.';
  //       this.otpSent = false;
  //     },
  //     error: () => {
  //       this.errorMsg = 'Invalid or expired OTP.';
  //     }
  //   });
  // }
}
