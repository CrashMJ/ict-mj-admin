import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditInqComponent } from "./edit.component";

describe("EditInqComponent", () => {
  let component: EditInqComponent;
  let fixture: ComponentFixture<EditInqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
