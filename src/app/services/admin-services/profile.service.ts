import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly api = `${environment.apiUrl}/users`;
  private profilePhotoSource = new BehaviorSubject<string>(
    'assets/img/avatars/default.jpg',
  );

  profilePhoto$ = this.profilePhotoSource.asObservable();

  constructor(private http: HttpClient) {}

  getProfile(): Observable<{ data: UserProfile }> {
    return this.http.get<{ data: UserProfile }>(`${this.api}/profile`);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.api}/profile`, data);
  }

  updateProfilePhoto(photoUrl: string): void {
    this.profilePhotoSource.next(photoUrl);
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
