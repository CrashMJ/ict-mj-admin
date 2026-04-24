import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteModalComponent } from './institute-modal.component';

describe('InstituteModalComponent', () => {
  let component: InstituteModalComponent;
  let fixture: ComponentFixture<InstituteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
