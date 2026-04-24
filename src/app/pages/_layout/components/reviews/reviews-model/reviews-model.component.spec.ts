import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ReviewsModelComponent } from "./reviews-model.component";

describe("ReviewsModelComponent", () => {
  let component: ReviewsModelComponent;
  let fixture: ComponentFixture<ReviewsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewsModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
