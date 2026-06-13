import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/admin-services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: false,

  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  loading = false;
  resetPasswordForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });

    if (!this.token) {
      this.toastr.error('Invalid reset link');
      this.router.navigate(['/login']);
      return;
    }
  }

  submit() {
    if (this.resetPasswordForm.invalid || this.loading) {
      return;
    }

    if (
      this.resetPasswordForm.value.password !==
      this.resetPasswordForm.value.confirmPassword
    ) {
      this.toastr.error('Passwords do not match');
      return;
    }

    this.loading = true;

    const request = {
      token: this.token,
      password: this.resetPasswordForm.value.password,
    };

    this.authService.resetPassword(request).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Password reset successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('RESET ERROR', err);
        this.loading = false;
        this.toastr.error(err.error?.message || 'Reset password failed');
      },
    });
  }
}
