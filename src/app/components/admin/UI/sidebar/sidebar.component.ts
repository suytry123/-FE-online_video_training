import { Component } from '@angular/core';
import { AuthService } from '../../../../services/admin-services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false,
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}
}
