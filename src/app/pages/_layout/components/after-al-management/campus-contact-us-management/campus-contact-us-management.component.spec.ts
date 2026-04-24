import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusContactUsManagementComponent } from './campus-contact-us-management.component';

describe('CampusContactUsManagementComponent', () => {
  let component: CampusContactUsManagementComponent;
  let fixture: ComponentFixture<CampusContactUsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusContactUsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusContactUsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
