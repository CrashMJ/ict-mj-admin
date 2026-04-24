import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampusContactComponent } from './edit-campus-contact.component';

describe('EditCampusContactComponent', () => {
  let component: EditCampusContactComponent;
  let fixture: ComponentFixture<EditCampusContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCampusContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCampusContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
