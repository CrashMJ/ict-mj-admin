import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPaymentsReportComponent } from './class-payments.component';

describe('ClassPaymentsReportComponent', () => {
  let component: ClassPaymentsReportComponent;
  let fixture: ComponentFixture<ClassPaymentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassPaymentsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
