import { Component } from '@angular/core';
import { ReportService } from '../../../../services/admin-services/report.service';

@Component({
  selector: 'app-report',
  standalone: false,
  
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  startDate!: string;
  endDate!: string;

  constructor(private reportService: ReportService) {}

  downloadFile(data: Blob, filename: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  daily() {
    this.reportService.getDaily().subscribe(res => {
      this.downloadFile(res, 'daily_report.pdf');
    });
  }

  weekly() {
    this.reportService.getWeekly().subscribe(res => {
      this.downloadFile(res, 'weekly_report.pdf');
    });
  }

  monthly() {
    this.reportService.getMonthly().subscribe(res => {
      this.downloadFile(res, 'monthly_report.pdf');
    });
  }

  yearly() {
    this.reportService.getYearly().subscribe(res => {
      this.downloadFile(res, 'yearly_report.pdf');
    });
  }

  between() {
    if (!this.startDate || !this.endDate) {
      alert('Please select start and end date');
      return;
    }

    this.reportService.getBetween(this.startDate, this.endDate)
      .subscribe(res => {
        this.downloadFile(res, 'custom_report.pdf');
      });
  }

  video() {
    this.reportService.getVideoReport().subscribe(res => {
      this.downloadFile(res, 'video_report.pdf');
    });
  }
}
