import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-public',
  standalone: false,

  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  // }
}
