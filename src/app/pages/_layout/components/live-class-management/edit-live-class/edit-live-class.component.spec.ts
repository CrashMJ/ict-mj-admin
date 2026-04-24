import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLiveClassComponent } from './edit-live-class.component';

describe('EditLiveClassComponent', () => {
  let component: EditLiveClassComponent;
  let fixture: ComponentFixture<EditLiveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLiveClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
