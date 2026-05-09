import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-public',
  standalone: false,

  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
