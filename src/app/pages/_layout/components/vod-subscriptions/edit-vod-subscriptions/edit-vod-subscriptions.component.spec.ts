import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVodSubscriptionComponent } from './edit-vod-subscriptions.component';

describe('EditVodSubscriptionComponent', () => {
  let component: EditVodSubscriptionComponent;
  let fixture: ComponentFixture<EditVodSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVodSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVodSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
