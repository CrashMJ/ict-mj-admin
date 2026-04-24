import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLiveTeacherComponent } from './edit-live-teacher.component';

describe('EditLiveTeacherComponent', () => {
  let component: EditLiveTeacherComponent;
  let fixture: ComponentFixture<EditLiveTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLiveTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLiveTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
