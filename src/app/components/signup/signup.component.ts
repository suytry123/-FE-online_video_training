import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/admin-services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false,
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  private passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';

    if (this.signupForm.invalid) {
      return;
    }

    const request = {
      username: this.f['username'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this.userService.signUp(request).subscribe({
      next: () => {
        this.successMsg = 'Registration successful! You can now log in.';
        this.signupForm.reset();
        this.submitted = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMsg = 'Username or email already exists.';
        } else {
          this.errorMsg = 'Registration failed. Please try again.';
        }
      },
    });
  }

  /*onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    if (this.signupForm.invalid) {
      return;
    }
    this.userService.signUp(this.signupForm.value).subscribe({
      next: () => {
        this.successMsg = 'Registration successful! You can now log in.';
        this.signupForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMsg = 'Username or email already exists.';
        } else {
          this.errorMsg = 'Registration failed. Please try again.';
        }
      },
    });
  }*/
}
