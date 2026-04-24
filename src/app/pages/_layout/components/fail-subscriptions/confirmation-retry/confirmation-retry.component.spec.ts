import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationRetryComponent } from './confirmation-retry.component';

describe('ConfirmationRetryComponent', () => {
  let component: ConfirmationRetryComponent;
  let fixture: ComponentFixture<ConfirmationRetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationRetryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationRetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
