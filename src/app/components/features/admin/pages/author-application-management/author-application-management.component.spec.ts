import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorApplicationManagementComponent } from './author-application-management.component';

describe('AuthorApplicationManagementComponent', () => {
  let component: AuthorApplicationManagementComponent;
  let fixture: ComponentFixture<AuthorApplicationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorApplicationManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorApplicationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
