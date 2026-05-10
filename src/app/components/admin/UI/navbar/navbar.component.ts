import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
declare const feather: { replace: () => void } | undefined;
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false,
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Navbar is created after login; render Feather icons after view mount.
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }

  signOut() {
    localStorage.removeItem('token');

    this.logoutEvent.emit(false);
    this.router.navigate(['/login']);
  }

  getUsername(): string {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user).username;
    }

    return 'User';
  }
}
