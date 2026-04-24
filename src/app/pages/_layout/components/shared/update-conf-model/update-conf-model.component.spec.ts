import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfModelComponent } from './update-conf-model.component';

describe('UpdateConfModelComponent', () => {
  let component: UpdateConfModelComponent;
  let fixture: ComponentFixture<UpdateConfModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConfModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConfModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
