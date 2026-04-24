import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFreeCardModalComponent } from './create-modal.component';

describe('CreateFreeCardModalComponent', () => {
  let component: CreateFreeCardModalComponent;
  let fixture: ComponentFixture<CreateFreeCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFreeCardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFreeCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
