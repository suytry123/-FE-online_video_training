import { Component } from '@angular/core';
import { PublicProfileComponent } from '../../user/public-profile/public-profile.component';

@Component({
  selector: 'app-admin-profile',
  standalone: false,

  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css',
})
export class AdminProfileComponent extends PublicProfileComponent {}
