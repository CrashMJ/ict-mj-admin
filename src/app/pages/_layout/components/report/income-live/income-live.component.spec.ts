import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeLiveReportComponent } from './income-live.component';

describe('IncomeLiveReportComponent', () => {
  let component: IncomeLiveReportComponent;
  let fixture: ComponentFixture<IncomeLiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeLiveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeLiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
