import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTeacherManagementComponent } from './live-teacher-management.component';

describe('LiveTeacherManagementComponent', () => {
  let component: LiveTeacherManagementComponent;
  let fixture: ComponentFixture<LiveTeacherManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveTeacherManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveTeacherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
