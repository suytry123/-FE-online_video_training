import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // url = 'http://localhost:8080/api/categories';
  private readonly url = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  saveCategory(category: any) {
    return this.http.post(this.url, category, {
      headers: this.getAuthHeaders(),
    });
  }

  getCategoryList(params?: HttpParams): Observable<any> {
    return this.http.get<any>(this.url, {
      params,
      headers: this.getAuthHeaders(),
    });
  }

  getById(id: number) {
    return this.http.get<any>(`${this.url}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCategory(category: any) {
    return this.http.put(`${this.url}/${category.id}`, category, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTrash(): Observable<any> {
    return this.http.get(`${this.url}/trash`, {
      headers: this.getAuthHeaders(),
    });
  }

  restore(id: number): Observable<any> {
    return this.http.put(
      `${this.url}/${id}/restore`,
      {},
      {
        headers: this.getAuthHeaders(),
      },
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }
}
