import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OpenResourceComponent } from "./open-resources.component";

describe("TipInfoManagementComponent", () => {
  let component: OpenResourceComponent;
  let fixture: ComponentFixture<OpenResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpenResourceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
