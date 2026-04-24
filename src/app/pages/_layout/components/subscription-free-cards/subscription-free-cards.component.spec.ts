import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFreeCardComponent } from './subscription-free-cards.component';

describe('SubscriptionFreeCardComponent', () => {
  let component: SubscriptionFreeCardComponent;
  let fixture: ComponentFixture<SubscriptionFreeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionFreeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
