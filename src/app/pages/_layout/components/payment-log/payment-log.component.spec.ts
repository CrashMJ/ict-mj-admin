import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLogManagementComponent } from './payment-log.component';

describe('PaymentLogManagementComponent', () => {
  let component: PaymentLogManagementComponent;
  let fixture: ComponentFixture<PaymentLogManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLogManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
