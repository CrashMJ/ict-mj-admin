import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWeeklyQuizComponent } from './edit-weekly-quiz.component';

describe('EditWeeklyQuizComponent', () => {
  let component: EditWeeklyQuizComponent;
  let fixture: ComponentFixture<EditWeeklyQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWeeklyQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeeklyQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
