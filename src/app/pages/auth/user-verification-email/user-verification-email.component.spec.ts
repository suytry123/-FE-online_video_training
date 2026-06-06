import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerificationEmailComponent } from './user-verification-email.component';

describe('UserVerificationEmailComponent', () => {
  let component: UserVerificationEmailComponent;
  let fixture: ComponentFixture<UserVerificationEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserVerificationEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVerificationEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
