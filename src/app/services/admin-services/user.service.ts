import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthorApplicationRequest,
  AuthorApplicationResponse,
} from '../../models/author-application.model';
import { PageResponse } from '../../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //url = '/api/';
  // url = 'http://localhost:8080/api/';
  private readonly url = `${environment.apiUrl}/`;

  constructor(private http: HttpClient) {}

  signUp(signupData: any): Observable<any> {
    return this.http.post(this.url + 'users/signup_user', signupData, {
      observe: 'response',
    });
  }

  /*submitAuthorApplication(data: AuthorApplicationRequest) {
    return this.http.post<AuthorApplicationResponse>(
      `${this.url}users/author-applications`,
      data,
    );
  }*/

  submitAuthorApplication(formData: FormData) {
    return this.http.post<AuthorApplicationResponse>(
      `${this.url}users/author-applications`,
      formData,
    );
  }

  getAuthorApplicationCv(id: number): Observable<Blob> {
    return this.http.get(`${this.url}users/author-applications/${id}/cv`, {
      responseType: 'blob',
    });
  }

  verifyEmail(token: string) {
    return this.http.get(`${this.url}users/verify-email`, {
      params: { token },
      responseType: 'text',
    });
  }

  approveAuthorApplication(id: number): Observable<string> {
    return this.http.post(
      `${this.url}users/author-applications/${id}/approve`,
      {},
      { responseType: 'text' },
    );
  }

  rejectAuthorApplication(id: number): Observable<string> {
    return this.http.post(
      `${this.url}users/author-applications/${id}/reject`,
      {},
      { responseType: 'text' },
    );
  }

  getAuthorApplications(params: any) {
    return this.http.get<PageResponse<AuthorApplicationResponse>>(
      `${this.url}users/author-applications`,
      { params },
    );
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

  /*getRoles(): string[] {
    const token = localStorage.getItem('token');

    if (!token) {
      return [];
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const authorities = payload?.authorities;

      if (!Array.isArray(authorities)) {
        return [];
      }

      return authorities
        .filter((a: any) => a.authority?.startsWith('ROLE_'))
        .map((a: any) => a.authority.replace('ROLE_', ''));
    } catch (error) {
      console.error('Invalid token:', error);

      return [];
    }
  }*/

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
