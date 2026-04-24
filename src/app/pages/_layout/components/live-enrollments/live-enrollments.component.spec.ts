import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodEnrollComponent } from './live-enrollments.component';

describe('TipInfoManagementComponent', () => {
  let component: VodEnrollComponent;
  let fixture: ComponentFixture<VodEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
