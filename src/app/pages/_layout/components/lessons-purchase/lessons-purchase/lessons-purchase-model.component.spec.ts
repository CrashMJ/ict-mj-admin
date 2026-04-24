import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LessonPurchaseModelComponent } from "./lessons-purchase-model.component";

describe("PaymentModelComponent", () => {
  let component: LessonPurchaseModelComponent;
  let fixture: ComponentFixture<LessonPurchaseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonPurchaseModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPurchaseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
