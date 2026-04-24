import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnalyticsComponent } from './report.component';

describe('ReportAnalyticsComponent', () => {
  let component: ReportAnalyticsComponent;
  let fixture: ComponentFixture<ReportAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
