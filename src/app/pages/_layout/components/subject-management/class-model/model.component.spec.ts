import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ClassModelComponent } from "./model.component";

describe("ClassModelComponent", () => {
  let component: ClassModelComponent;
  let fixture: ComponentFixture<ClassModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
