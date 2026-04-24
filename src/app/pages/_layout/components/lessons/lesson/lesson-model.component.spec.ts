import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LessonModelComponent } from "./lesson-model.component";

describe("LessonModelComponent", () => {
  let component: LessonModelComponent;
  let fixture: ComponentFixture<LessonModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
