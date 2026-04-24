import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLogManagementComponent } from './api-log.component';

describe('ApiLogManagementComponent', () => {
  let component: ApiLogManagementComponent;
  let fixture: ComponentFixture<ApiLogManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiLogManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiLogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
