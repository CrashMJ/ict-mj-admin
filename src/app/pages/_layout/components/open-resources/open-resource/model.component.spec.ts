import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OpenResourceModelComponent } from "./model.component";

describe("OpenResourceModelComponent", () => {
  let component: OpenResourceModelComponent;
  let fixture: ComponentFixture<OpenResourceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenResourceModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenResourceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
