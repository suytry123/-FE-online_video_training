import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseTrashComponent } from './admin-course-trash.component';

describe('AdminCourseTrashComponent', () => {
  let component: AdminCourseTrashComponent;
  let fixture: ComponentFixture<AdminCourseTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCourseTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
