import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceiptsComponent } from './edit-receipts.component';

describe('EditReceiptsComponent', () => {
  let component: EditReceiptsComponent;
  let fixture: ComponentFixture<EditReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
