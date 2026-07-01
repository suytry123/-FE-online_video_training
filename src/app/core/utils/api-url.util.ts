import { environment } from '../../../environments/environment';

// import { environment } from '../../../environments/environment.ngrok';

/*export function courseImageUrl(id: number): string {
  return `${environment.apiUrl}/courses/image/${id}`;
}*/

export function courseImageUrl(id: number): string {
  console.log('environment.apiUrl = ', environment.apiUrl);

  const url = `${environment.apiUrl}/courses/image/${id}`;

  console.log('generated image url = ', url);

  return url;
}

export function userPhotoUrl(id: number, refresh = false): string {
  console.log('environment.apiUrl = ', environment.apiUrl);

  return refresh
    ? `${environment.apiUrl}/users/photo/${id}?t=${Date.now()}`
    : `${environment.apiUrl}/users/photo/${id}`;
}
