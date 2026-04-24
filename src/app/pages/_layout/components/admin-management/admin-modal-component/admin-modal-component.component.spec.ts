import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalComponentComponent } from './admin-modal-component.component';

describe('AdminModalComponentComponent', () => {
  let component: AdminModalComponentComponent;
  let fixture: ComponentFixture<AdminModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModalComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
