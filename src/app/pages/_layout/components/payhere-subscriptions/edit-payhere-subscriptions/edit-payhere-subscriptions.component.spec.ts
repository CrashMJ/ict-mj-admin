import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayhereSubscriptionsComponent } from './edit-payhere-subscriptions.component';

describe('EditPayhereSubscriptionsComponent', () => {
  let component: EditPayhereSubscriptionsComponent;
  let fixture: ComponentFixture<EditPayhereSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayhereSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayhereSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
