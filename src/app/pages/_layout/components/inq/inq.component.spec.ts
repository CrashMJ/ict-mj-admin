import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InqManagementComponent } from "./inq.component";

describe("InqManagementComponent", () => {
  let component: InqManagementComponent;
  let fixture: ComponentFixture<InqManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InqManagementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InqManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
