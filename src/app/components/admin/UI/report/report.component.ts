import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../services/admin-services/report.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-report',
  standalone: false,

  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent implements OnInit {
  startDate!: string;
  endDate!: string;
  dashboardData: any;

  lineChartData: any;

  pieChartData: any;

  constructor(private reportService: ReportService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  daily() {
    this.reportService.getDaily().subscribe((res) => {
      this.downloadFile(res, 'daily_report.pdf');
    });
  }

  weekly() {
    this.reportService.getWeekly().subscribe((res) => {
      this.downloadFile(res, 'weekly_report.pdf');
    });
  }

  monthly() {
    this.reportService.getMonthly().subscribe((res) => {
      this.downloadFile(res, 'monthly_report.pdf');
    });
  }

  yearly() {
    this.reportService.getYearly().subscribe((res) => {
      this.downloadFile(res, 'yearly_report.pdf');
    });
  }

  between() {
    if (!this.startDate || !this.endDate) {
      alert('Please select start and end date');
      return;
    }

    this.reportService
      .getBetween(this.startDate, this.endDate)
      .subscribe((res) => {
        this.downloadFile(res, 'custom_report.pdf');
      });
  }

  video() {
    this.reportService.getVideoReport().subscribe((res) => {
      this.downloadFile(res, 'video_report.pdf');
    });
  }

  loadDashboard(): void {
    this.reportService.getDashboard('weekly').subscribe({
      next: (res) => {
        console.log('Dashboard Response:', res);

        this.dashboardData = res;

        this.loadCharts();
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  loadCharts(): void {
    this.lineChartData = {
      labels: this.dashboardData.user_trend.map((x: any) => x.label),

      datasets: [
        {
          data: this.dashboardData.user_trend.map((x: any) => x.value),
          label: 'Users',
          tension: 0.4,
        },
      ],
    };

    this.pieChartData = {
      labels: this.dashboardData.role_breakdown.map((x: any) => x.label),

      datasets: [
        {
          data: this.dashboardData.role_breakdown.map((x: any) => x.value),
        },
      ],
    };
  }
}
