import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorReportComponent } from './behavior.component';

describe('BehaviorReportComponent', () => {
  let component: BehaviorReportComponent;
  let fixture: ComponentFixture<BehaviorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehaviorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
