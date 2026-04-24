import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AssignManagementComponent } from "./assignment-management.component";

describe("AssignManagementComponent", () => {
  let component: AssignManagementComponent;
  let fixture: ComponentFixture<AssignManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
