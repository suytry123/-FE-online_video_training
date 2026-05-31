import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly api = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${this.api}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.api}/profile`, data);
  }

  uploadPhoto(userId: number, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('photo', file);

    return this.http.post(`${this.api}/photo/${userId}`, formData);
  }

  updatePhoto(userId: number, file: File) {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.put(`${this.api}/photo/${userId}`, formData);
  }
}
