import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusContactModalComponent } from './campus-contact-modal.component';

describe('CampusContactModalComponent', () => {
  let component: CampusContactModalComponent;
  let fixture: ComponentFixture<CampusContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusContactModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
