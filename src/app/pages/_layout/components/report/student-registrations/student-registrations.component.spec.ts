import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationsReportComponent } from './student-registrations.component';

describe('StudentRegistrationsReportComponent', () => {
  let component: StudentRegistrationsReportComponent;
  let fixture: ComponentFixture<StudentRegistrationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRegistrationsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
