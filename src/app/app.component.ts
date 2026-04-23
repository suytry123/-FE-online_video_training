import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'FE';
  isLogin = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLogin = !!localStorage.getItem("token");
  }

  switchView(isSignIn:boolean){
    this.isLogin = isSignIn;

    if(!isSignIn) {
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/dashboard']);
    }
  }
}
