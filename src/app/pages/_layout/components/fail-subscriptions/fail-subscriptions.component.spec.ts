import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailSubscriptionsComponent } from './fail-subscriptions.component';

describe('FailSubscriptionsComponent', () => {
  let component: FailSubscriptionsComponent;
  let fixture: ComponentFixture<FailSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
