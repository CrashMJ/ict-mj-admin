import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVodEnrollComponent } from './edit-vod-enrollments.component';

describe('EditVodEnrollComponent', () => {
  let component: EditVodEnrollComponent;
  let fixture: ComponentFixture<EditVodEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVodEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVodEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
