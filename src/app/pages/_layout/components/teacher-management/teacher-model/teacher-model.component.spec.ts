import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModelComponent } from './teacher-model.component';

describe('TeacherModelComponent', () => {
  let component: TeacherModelComponent;
  let fixture: ComponentFixture<TeacherModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
