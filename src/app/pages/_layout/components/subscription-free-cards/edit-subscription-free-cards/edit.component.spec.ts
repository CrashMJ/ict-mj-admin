import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBankSubscriptionsComponent } from './edit.component';

describe('EditBankSubscriptionsComponent', () => {
  let component: EditBankSubscriptionsComponent;
  let fixture: ComponentFixture<EditBankSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBankSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBankSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
