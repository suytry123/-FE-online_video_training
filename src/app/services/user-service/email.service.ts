import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly apiUrl = `${environment.apiUrl}/auth/verify-email`;

  constructor(private http: HttpClient) {}

  verifyEmail(token: string) {
    return this.http.get(this.apiUrl, {
      params: { token },
    });
  }
}
