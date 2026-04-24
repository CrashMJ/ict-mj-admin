import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FaqModelComponent } from "./faq-model.component";

describe("FaqModelComponent", () => {
  let component: FaqModelComponent;
  let fixture: ComponentFixture<FaqModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
