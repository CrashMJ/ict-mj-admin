import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveClassModalComponent } from './live-class-modal.component';

describe('LiveClassModalComponent', () => {
  let component: LiveClassModalComponent;
  let fixture: ComponentFixture<LiveClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveClassModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
