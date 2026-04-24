import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InqModelComponent } from "./model.component";

describe("InqModelComponent", () => {
  let component: InqModelComponent;
  let fixture: ComponentFixture<InqModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InqModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InqModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
