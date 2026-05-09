import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticSectionComponent } from './statistic-section.component';

describe('StatisticSectionComponent', () => {
  let component: StatisticSectionComponent;
  let fixture: ComponentFixture<StatisticSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatisticSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
