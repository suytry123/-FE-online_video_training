import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

   saveCourse(course: any) {
      return this.http.post(this.url, course, { headers: this.getAuthHeaders() });
    }
  
    getCourseList(params?: HttpParams): Observable<any> {
      return this.http.get<any>(this.url, { params, headers: this.getAuthHeaders() });
    }
  
    getById(id: number) {
      return this.http.get<any>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
    }
  
    updateCourse(course: any) {
      return this.http.put(`${this.url}/${course.id}`, course, { headers: this.getAuthHeaders() });
    }
  
    deleteCourse(id: number) {
      return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
    }
  
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
    }
}
