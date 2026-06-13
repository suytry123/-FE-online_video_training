import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/admin-services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/admin-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loginError: string = '';
  // @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn() {
    this.loginError = '';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const loginData = this.loginForm.value;
    // console.log('Login data:', loginData);
    this.authService.login(loginData).subscribe({
      next: (res: HttpResponse<any>) => {
        const token = res.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(res.body));
          const roles = this.authService.getRoles();
          console.log('User roles:', roles);
          // if (role === 'ADMIN' || role === 'AUTHOR') {
          if (roles.includes('ADMIN') || roles.includes('AUTHOR')) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
          // this.loginEvent.emit(true);
          // this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        // console.log(err);
        this.submitted = false;
        const message = err?.error?.message || 'Invalid email or password';

        this.loginError = message;

        if (message.includes('Account locked')) {
          this.toastr.warning(message);
        } else {
          this.toastr.error(message);
        }
      },
    });
  }

  goSignup() {
    this.router.navigate(['/signup']);
  }
}
