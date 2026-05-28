import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  // private api = 'http://localhost:8080/api/videos';
  private readonly api = `${environment.apiUrl}/videos`;

  constructor(private http: HttpClient) {}

  saveVideo(data: any) {
    return this.http.post(this.api, data);
  }

  getVideosByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/course/${courseId}`);
  }

  deleteVideo(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  getTrash() {
    return this.http.get(`${this.api}/trash`);
  }

  restore(id: number) {
    return this.http.put(`${this.api}/${id}/restore`, {});
  }

  // addVideoLinks(videoId: number, links: string[]) {
  //   return this.http.post(
  //     `${this.api}/${videoId}/linkVideo`,
  //     links
  //   );
  // }
}
