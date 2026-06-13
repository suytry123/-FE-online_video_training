import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorApplicationComponent } from './author-application.component';

describe('AuthorApplicationComponent', () => {
  let component: AuthorApplicationComponent;
  let fixture: ComponentFixture<AuthorApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
