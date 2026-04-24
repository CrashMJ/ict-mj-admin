import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionsReportComponent } from './acquisitions.component';

describe('AcquisitionsReportComponent', () => {
  let component: AcquisitionsReportComponent;
  let fixture: ComponentFixture<AcquisitionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
