import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPurchaseComponent } from './lesson-purchase.component';

describe('LessonPurchaseComponent', () => {
  let component: LessonPurchaseComponent;
  let fixture: ComponentFixture<LessonPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
