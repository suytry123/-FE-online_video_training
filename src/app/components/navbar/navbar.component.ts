import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  signOut(){
    localStorage.removeItem("token");
    this.logoutEvent.emit(false);
    this.router.navigate(['/login']);
  }
}
