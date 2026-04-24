import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayhereSubscriptionsComponent } from './payhere-subscriptions.component';

describe('PayhereSubscriptionsComponent', () => {
  let component: PayhereSubscriptionsComponent;
  let fixture: ComponentFixture<PayhereSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayhereSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayhereSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
