import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSltSubscriptionsComponent } from './edit-slt-subscriptions.component';

describe('EditSltSubscriptionsComponent', () => {
  let component: EditSltSubscriptionsComponent;
  let fixture: ComponentFixture<EditSltSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSltSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSltSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
