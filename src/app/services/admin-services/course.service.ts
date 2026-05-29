import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // private readonly url = 'http://localhost:8080/api/courses';
  private readonly url = `${environment.apiUrl}/courses`;
  private readonly categoryUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  saveCourse(course: any) {
    return this.http.post(this.url, course);
  }

  getCourseList(params?: HttpParams): Observable<any> {
    return this.http.get<any>(this.url, { params });
  }

  getCategories(params?: HttpParams): Observable<any> {
    return this.http.get<any>(this.categoryUrl, { params });
  }

  getById(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateCourse(course: any) {
    return this.http.put(`${this.url}/${course.id}`, course);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  uploadImage(id: number, file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.url}/upload/${id}`, formData);
  }

  updateImage(id: number, file: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.put(`${this.url}/update/${id}`, formData);
  }

  getTrash() {
    return this.http.get(`${this.url}/trash`);
  }

  restore(id: number) {
    return this.http.put(`${this.url}/${id}/restore`, {});
  }
}
