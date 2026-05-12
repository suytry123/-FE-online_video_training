import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //url = '/api/';
  url = 'http://localhost:8080/api/';

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

  signUp(signupData: any): Observable<any> {
    return this.http.post(this.url + 'user/signup_user', signupData, {
      observe: 'response',
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getRoles(): string[] {
  const token = localStorage.getItem('token');

  if (!token) {
    return [];
  }

  try {

    const payload = JSON.parse(
      atob(token.split('.')[1])
    );

    const authorities = payload?.authorities;

    if (!Array.isArray(authorities)) {
      return [];
    }

    return authorities
      .filter((a: any) =>
        a.authority?.startsWith('ROLE_')
      )
      .map((a: any) =>
        a.authority.replace('ROLE_', '')
      );

  } catch (error) {

    console.error('Invalid token:', error);

    return [];
  }
}

  /*getRole(): string | null {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const authorities = payload?.authorities;

      if (!Array.isArray(authorities)) {
        return null;
      }

      const role = authorities.find((a: any) =>
        a.authority?.startsWith('ROLE_'),
      );

      if (!role) {
        return null;
      }

      return role.authority.replace('ROLE_', '');
    } catch (error) {
      console.error('Invalid token:', error);

      return null;
    }
  }*/

  // getUserList(): Observable<any[]> {
  //   return this.http.get<any[]>(this.url + 'users');
  // }

  // requestPasswordReset(email: string) {
  //   return this.http.post(this.url + 'otp/request', { email });
  // }

  // verifyOtp(otp: string, newPassword: string) {
  //   return this.http.post(this.url + 'otp/verify', { otp, newPassword });
  // }
}
