import { Component, OnInit } from '@angular/core';
import { PublicCourseService } from '../../../services/public-services/public-course.service';

@Component({
  selector: 'app-statistic-section',
  standalone: false,

  templateUrl: './statistic-section.component.html',
  styleUrl: './statistic-section.component.css',
})
export class StatisticSectionComponent implements OnInit {

  stats: any;

  constructor(private publicCourseService: PublicCourseService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.publicCourseService.getStatistics().subscribe({
      next: (res) => {
        this.stats = res;

        console.log(res);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
