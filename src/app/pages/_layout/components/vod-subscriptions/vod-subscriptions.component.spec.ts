import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodSubscriptionComponent } from './vod-subscriptions.component';

describe('VodSubscriptionComponent', () => {
  let component: VodSubscriptionComponent;
  let fixture: ComponentFixture<VodSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
