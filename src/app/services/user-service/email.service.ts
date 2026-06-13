import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/api-response.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly apiUrl = `${environment.apiUrl}/email`;

  constructor(private http: HttpClient) {}

  /*verifyEmail(token: string): Observable<ApiResponse<void>> {
    return this.http.get<ApiResponse<void>>(`${this.apiUrl}/verify-email`, {
      params: { token },
    });
  }*/

  resendVerificationEmail(request: { email: string }) {
    return this.http.post<ApiResponse<void>>(
      `${this.apiUrl}/resend-verification`,
      request,
    );
  }
}
