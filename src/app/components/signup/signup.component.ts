import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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

  onSubmit() {
    this.submitted = true;
    this.successMsg = '';
    this.errorMsg = '';
    if (this.signupForm.invalid) {
      return;
    }
    this.userService.saveUser(this.signupForm.value).subscribe({
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
