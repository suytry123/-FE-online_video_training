import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ProfileService } from '../../../services/admin-services/profile.service';
import { userPhotoUrl } from '../../../core/utils/api-url.util';

@Component({
  selector: 'app-navbar-public',
  standalone: false,

  templateUrl: './navbar-public.component.html',
  styleUrl: './navbar-public.component.css',
})
export class NavbarPublicComponent implements OnInit {
  navbarPhoto = 'assets/img/avatars/default.jpg';
  username = '';
  constructor(
    private router: Router,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loadNavbarUser();
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  loadNavbarUser(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        const user = res.data;

        this.username = user.username;

        this.navbarPhoto = user.photo
          ? // ? `${environment.apiUrl}/user/photo/${user.id}?t=${Date.now()}`
            userPhotoUrl(user.id)
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
