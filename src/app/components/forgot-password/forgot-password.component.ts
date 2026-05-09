import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/admin-services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  otpForm: FormGroup;
  submitted = false;
  otpSent = false;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
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
