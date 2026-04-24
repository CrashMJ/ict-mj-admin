import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyQuizModelComponent } from './weekly-quiz-model.component';

describe('WeeklyQuizModelComponent', () => {
  let component: WeeklyQuizModelComponent;
  let fixture: ComponentFixture<WeeklyQuizModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyQuizModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyQuizModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
