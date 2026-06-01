import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { VideoDTO } from '../../models/course-detail.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  // private api = 'http://localhost:8080/api/videos';
  private readonly api = `${environment.apiUrl}/videos`;

  constructor(private http: HttpClient) {}

  saveVideo(data: VideoDTO): Observable<VideoDTO> {
    return this.http.post<VideoDTO>(this.api, data);
  }

  getVideosByCourse(courseId: number): Observable<VideoDTO[]> {
    return this.http.get<VideoDTO[]>(`${this.api}/course/${courseId}`);
  }

  getVideoById(id: number): Observable<VideoDTO> {
    return this.http.get<VideoDTO>(`${this.api}/${id}`);
  }

  updateVideo(id: number, data: VideoDTO): Observable<VideoDTO> {
    return this.http.put<VideoDTO>(`${this.api}/${id}`, data);
  }

  deleteVideo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getTrash(): Observable<VideoDTO[]> {
    return this.http.get<VideoDTO[]>(`${this.api}/trash`);
  }

  restore(id: number): Observable<void> {
    return this.http.put<void>(`${this.api}/${id}/restore`, {});
  }

  // addVideoLinks(videoId: number, links: string[]) {
  //   return this.http.post(
  //     `${this.api}/${videoId}/linkVideo`,
  //     links
  //   );
  // }
}
