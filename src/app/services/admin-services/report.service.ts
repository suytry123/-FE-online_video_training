import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  // private baseUrl = 'http://localhost:8080/api/report';
  private readonly baseUrl = `${environment.apiUrl}/report`;

  constructor(private http: HttpClient) {}

  getDaily() {
    return this.http.get(`${this.baseUrl}/daily`, { responseType: 'blob' });
  }

  getWeekly() {
    return this.http.get(`${this.baseUrl}/weekly`, { responseType: 'blob' });
  }

  getMonthly() {
    return this.http.get(`${this.baseUrl}/monthly`, { responseType: 'blob' });
  }

  getYearly() {
    return this.http.get(`${this.baseUrl}/yearly`, { responseType: 'blob' });
  }

  getBetween(start: string, end: string) {
    return this.http.get(`${this.baseUrl}/between?start=${start}&end=${end}`, {
      responseType: 'blob',
    });
  }

  getVideoReport() {
    return this.http.get(`${this.baseUrl}/video`, { responseType: 'blob' });
  }

  getDashboard(period: string) {
    return this.http.get<any>(`${this.baseUrl}/dashboard?period=${period}`);
  }
}
