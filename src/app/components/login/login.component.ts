import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signIn() {
    const loginData = this.loginForm.value;
    // console.log('Login data:', loginData);
    this.userService.login(loginData).subscribe({
      next: (res: HttpResponse<any>) => {
        const token = res.headers.get("Authorization");
        if (token) {
          localStorage.setItem("token", token);
          this.loginEvent.emit(true);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
