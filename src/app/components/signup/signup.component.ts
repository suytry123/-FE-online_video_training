import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
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
      }
    });
  }
}
