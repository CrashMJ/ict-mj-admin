import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApiLogComponent } from './edit.component';

describe('EditApiLogComponent', () => {
  let component: EditApiLogComponent;
  let fixture: ComponentFixture<EditApiLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApiLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApiLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
