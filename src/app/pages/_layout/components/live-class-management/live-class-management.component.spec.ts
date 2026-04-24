import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassManagementComponent } from './live-class-management.component';

describe('LiveClassManagementComponent', () => {
  let component: LiveClassManagementComponent;
  let fixture: ComponentFixture<LiveClassManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveClassManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
