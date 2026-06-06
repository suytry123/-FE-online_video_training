import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
declare const feather: { replace: () => void } | undefined;
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ProfileService } from '../../../../services/admin-services/profile.service';
import { UserService } from '../../../../services/admin-services/user.service';
import { userPhotoUrl } from '../../../../core/utils/api-url.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false,
})
export class NavbarComponent implements OnInit, AfterViewInit {
  navbarPhoto = 'assets/img/avatars/default.jpg';

  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (this.userService.isLoggedIn()) {
      this.loadNavbarUser();
    }
  }

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

  loadNavbarUser() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        const user = res.data;

        this.navbarPhoto = user.photo
          ? // ? `${environment.apiUrl}/user/photo/${user.id}?t=${Date.now()}`
            userPhotoUrl(user.id)
          : 'assets/img/avatars/default.jpg';
      },
      error: () => {
        this.navbarPhoto = 'assets/img/avatars/default.jpg';
      },
    });
  }
}
