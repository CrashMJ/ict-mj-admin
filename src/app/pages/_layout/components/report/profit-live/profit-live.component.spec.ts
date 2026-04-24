import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLiveReportComponent } from './profit-live.component';

describe('ProfitLiveReportComponent', () => {
  let component: ProfitLiveReportComponent;
  let fixture: ComponentFixture<ProfitLiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitLiveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitLiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
