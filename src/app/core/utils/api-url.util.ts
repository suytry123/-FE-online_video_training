import { environment } from '../../../environments/environment';

export function courseImageUrl(id: number): string {
  return `${environment.apiUrl}/courses/image/${id}`;
}

export function userPhotoUrl(id: number, refresh = false): string {
  return refresh
    ? `${environment.apiUrl}/user/photo/${id}?t=${Date.now()}`
    : `${environment.apiUrl}/user/photo/${id}`;
}
