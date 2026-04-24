import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalRegistrationComponent } from './total-registration.component';

describe('TotalRegistrationComponent', () => {
  let component: TotalRegistrationComponent;
  let fixture: ComponentFixture<TotalRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
