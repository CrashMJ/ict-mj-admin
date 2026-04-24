import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeVodReportComponent } from './income-vod.component';

describe('IncomeVodReportComponent', () => {
  let component: IncomeVodReportComponent;
  let fixture: ComponentFixture<IncomeVodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeVodReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeVodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
