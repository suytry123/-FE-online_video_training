import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CourseDetail } from '../../models/course-detail.model';

@Injectable({
  providedIn: 'root',
})
export class PublicCourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/summary`);
  }

  getCourseDetail(id: number): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${this.apiUrl}/${id}/detail`);
  }

  addView(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/view`, {});
  }

  likeCourse(courseId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/like`, {});
  }

  unlikeCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/like`);
  }

  getStatistics() {
    return this.http.get<any>('http://localhost:8080/api/public/statistics');
  }

  // increaseView(id: number): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${id}/view`, {});
  // }

  // likeCourse(id: number): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/${id}/like`, {});
  // }
}
