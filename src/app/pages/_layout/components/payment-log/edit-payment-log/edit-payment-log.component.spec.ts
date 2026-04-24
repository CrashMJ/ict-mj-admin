import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentLogComponent } from './edit-payment-log.component';

describe('EditPaymentLogComponent', () => {
  let component: EditPaymentLogComponent;
  let fixture: ComponentFixture<EditPaymentLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
