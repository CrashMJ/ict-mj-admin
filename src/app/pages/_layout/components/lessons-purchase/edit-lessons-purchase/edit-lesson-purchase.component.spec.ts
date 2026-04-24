import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLessonPurchaseComponent } from './edit-lesson-purchase.component';

describe('EditLessonPurchaseComponent', () => {
  let component: EditLessonPurchaseComponent;
  let fixture: ComponentFixture<EditLessonPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLessonPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLessonPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
