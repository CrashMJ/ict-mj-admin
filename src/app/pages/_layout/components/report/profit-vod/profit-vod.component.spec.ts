import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitVodReportComponent } from './profit-vod.component';

describe('ProfitVodReportComponent', () => {
  let component: ProfitVodReportComponent;
  let fixture: ComponentFixture<ProfitVodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitVodReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitVodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
