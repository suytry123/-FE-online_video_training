import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVideoTrashComponent } from './admin-video-trash.component';

describe('AdminVideoTrashComponent', () => {
  let component: AdminVideoTrashComponent;
  let fixture: ComponentFixture<AdminVideoTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVideoTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVideoTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
