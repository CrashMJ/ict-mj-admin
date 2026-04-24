import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SltSubscriptionsComponent } from './bank-subscriptions.component';

describe('SltSubscriptionsComponent', () => {
  let component: SltSubscriptionsComponent;
  let fixture: ComponentFixture<SltSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SltSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SltSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
