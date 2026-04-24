import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterALManagementComponent } from './after-al-management.component';

describe('AfterALManagementComponent', () => {
  let component: AfterALManagementComponent;
  let fixture: ComponentFixture<AfterALManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterALManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterALManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
