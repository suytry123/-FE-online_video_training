import { Component, Input } from '@angular/core';
import { courseImageUrl } from '../../../core/utils/api-url.util';
import { CourseSummary } from '../../../models/course-summary.model';

@Component({
  selector: 'app-popular-course-section',
  standalone: false,

  templateUrl: './popular-course-section.component.html',
  styleUrl: './popular-course-section.component.css',
})
export class PopularCourseSectionComponent {
  @Input() courses: any[] = [];

  getImageUrl = courseImageUrl;

  trackByCourseId(index: number, course: any): number {
    return course.id;
  }
}
