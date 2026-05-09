import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCourseSectionComponent } from './popular-course-section.component';

describe('PopularCourseSectionComponent', () => {
  let component: PopularCourseSectionComponent;
  let fixture: ComponentFixture<PopularCourseSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularCourseSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
