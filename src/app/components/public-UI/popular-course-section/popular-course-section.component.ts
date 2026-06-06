import { Component, Input } from '@angular/core';
import { courseImageUrl } from '../../../core/utils/api-url.util';

@Component({
  selector: 'app-popular-course-section',
  standalone: false,

  templateUrl: './popular-course-section.component.html',
  styleUrl: './popular-course-section.component.css',
})
export class PopularCourseSectionComponent {
  @Input() courses: any[] = [];

  getImageUrl = courseImageUrl;
}
