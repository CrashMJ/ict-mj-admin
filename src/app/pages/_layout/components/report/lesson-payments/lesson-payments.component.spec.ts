import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPaymentsReportComponent } from './lesson-payments.component';

describe('LessonPaymentsReportComponent', () => {
  let component: LessonPaymentsReportComponent;
  let fixture: ComponentFixture<LessonPaymentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPaymentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
