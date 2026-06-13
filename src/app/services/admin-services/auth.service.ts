import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = `${environment.apiUrl}/`;

  constructor(private http: HttpClient) {}

  saveUser(user: any) {
    return this.http.post(this.url + 'auth/signup', user, {
      observe: 'response',
    });
  }

  login(loginData: any): Observable<any> {
    return this.http.post(this.url + 'auth/signin', loginData, {
      observe: 'response',
    });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.url}auth/forgot-password`, {
      email,
    });
  }

  resetPassword(data: { token: string; password: string }) {
    return this.http.post(`${this.url}auth/reset-password`, data);
  }

  getRoles(): string[] {
    const token = localStorage.getItem('token');

    if (!token) {
      return [];
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      console.log('JWT Payload:', payload);

      const authorities = payload?.authorities;

      if (!Array.isArray(authorities)) {
        return [];
      }

      return authorities.map((a: any) => a.authority.replace('ROLE_', ''));
    } catch (error) {
      console.error('Invalid token:', error);
      return [];
    }
  }
}
