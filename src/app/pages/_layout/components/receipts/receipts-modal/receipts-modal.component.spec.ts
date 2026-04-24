import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsModalComponent } from './receipts-modal.component';

describe('ReceiptsModalComponent', () => {
  let component: ReceiptsModalComponent;
  let fixture: ComponentFixture<ReceiptsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
