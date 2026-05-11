import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryTrashComponent } from './admin-category-trash.component';

describe('AdminCategoryTrashComponent', () => {
  let component: AdminCategoryTrashComponent;
  let fixture: ComponentFixture<AdminCategoryTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoryTrashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
