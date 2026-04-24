import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLiveEnrollComponent } from './edit-live-enrollments.component';

describe('EditLiveEnrollComponent', () => {
  let component: EditLiveEnrollComponent;
  let fixture: ComponentFixture<EditLiveEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLiveEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLiveEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
