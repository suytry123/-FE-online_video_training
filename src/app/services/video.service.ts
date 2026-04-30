import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private api = 'http://localhost:8080/api/videos';

  constructor(private http: HttpClient) {}

  saveVideo(data: any) {
    return this.http.post(this.api, data);
  }
  
  getVideosByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/course/${courseId}`);
  }
}
