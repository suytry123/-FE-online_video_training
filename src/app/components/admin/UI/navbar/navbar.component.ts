import {
  AfterViewInit,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
declare const feather: { replace: () => void } | undefined;
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ProfileService } from '../../../../services/admin-services/profile.service';
import { UserService } from '../../../../services/admin-services/user.service';
import { userPhotoUrl } from '../../../../core/utils/api-url.util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false,
})
export class NavbarComponent implements OnInit, AfterViewInit {
  navbarPhoto = 'assets/img/avatars/default.jpg';
  private destroyRef = inject(DestroyRef);

  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor(
    private router: Router,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.loadNavbarUser();

    this.profileService.profilePhoto$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photo) => {
        if (photo) {
          this.navbarPhoto = photo;
        }
      });
  }

  ngAfterViewInit(): void {
    // Navbar is created after login; render Feather icons after view mount.
    if (typeof feather !== 'undefined') {
      feather.replace();
    }
  }
  signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.profileService.updateProfilePhoto('assets/img/avatars/default.jpg');

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
            userPhotoUrl(user.id, true)
          : 'assets/img/avatars/default.jpg';
      },
      error: () => {
        this.navbarPhoto = 'assets/img/avatars/default.jpg';
      },
    });
  }
}
