import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartAmountComponent } from './pie-chart-amount.component';

describe('PieChartAmountComponent', () => {
  let component: PieChartAmountComponent;
  let fixture: ComponentFixture<PieChartAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
