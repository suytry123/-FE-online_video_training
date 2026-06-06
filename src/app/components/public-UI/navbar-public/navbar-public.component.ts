import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/admin-services/profile.service';
import { userPhotoUrl } from '../../../core/utils/api-url.util';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar-public',
  standalone: false,

  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent implements OnInit {
  navbarPhoto = 'assets/img/avatars/default.jpg';
  username = '';
  isAuthenticated = false;

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    /* if (this.isLoggedIn()) {
       this.loadNavbarUser();
     }*/
    this.isAuthenticated = !!localStorage.getItem('token');

    if (this.isAuthenticated) {
      this.loadNavbarUser();
    }

    this.profileService.profilePhoto$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photo) => {
        if (photo) {
          this.navbarPhoto = photo;
        }
      });
  }

  /*isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }*/

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.profileService.updateProfilePhoto('assets/img/avatars/default.jpg');

    this.isAuthenticated = false;
    this.username = '';
    this.navbarPhoto = 'assets/img/avatars/default.jpg';

    this.router.navigate(['/']);
  }

  /*logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }*/

  loadNavbarUser(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        const user = res.data;

        this.username = user.username;

        this.navbarPhoto = user.photo
          ? // ? `${environment.apiUrl}/user/photo/${user.id}?t=${Date.now()}`
            userPhotoUrl(user.id, true)
          : 'assets/img/avatars/default.jpg';
      },
      error: () => {
        this.username = '';
        this.navbarPhoto = 'assets/img/avatars/default.jpg';
      },
    });
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  // }
}
