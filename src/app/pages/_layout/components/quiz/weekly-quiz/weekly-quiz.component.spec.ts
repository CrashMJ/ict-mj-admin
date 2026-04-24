import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyQuizComponent } from './weekly-quiz.component';

describe('WeeklyQuizComponent', () => {
  let component: WeeklyQuizComponent;
  let fixture: ComponentFixture<WeeklyQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
