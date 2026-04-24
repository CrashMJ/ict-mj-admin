import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivePaymentComponent } from './payments.component';

describe('TipInfoManagementComponent', () => {
  let component: LivePaymentComponent;
  let fixture: ComponentFixture<LivePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
