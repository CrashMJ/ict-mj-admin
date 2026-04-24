import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectModelComponent } from './subject-model.component';

describe('SubjectModelComponent', () => {
  let component: SubjectModelComponent;
  let fixture: ComponentFixture<SubjectModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
