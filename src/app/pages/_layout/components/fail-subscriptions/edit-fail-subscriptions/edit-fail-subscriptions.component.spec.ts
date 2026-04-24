import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFailSubscriptionsComponent } from './edit-fail-subscriptions.component';

describe('EditFailSubscriptionsComponent', () => {
  let component: EditFailSubscriptionsComponent;
  let fixture: ComponentFixture<EditFailSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFailSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFailSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
