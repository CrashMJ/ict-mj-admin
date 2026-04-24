import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CourseModelComponent } from "./model.component";

describe("CourseModelComponent", () => {
  let component: CourseModelComponent;
  let fixture: ComponentFixture<CourseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
