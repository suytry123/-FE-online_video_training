import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //url = '/api/';
    url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  saveUser(user: any) {
    return this.http.post(this.url + 'auth/signup', user, { observe: 'response' });
  }

  login(loginData: any): Observable<any> {
    return this.http.post(this.url + 'auth/signin', loginData, { observe: 'response' });
  }

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
