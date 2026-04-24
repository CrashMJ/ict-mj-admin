import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAmountsTextComponent } from './total-amounts-text.component';

describe('TotalAmountsTextComponent', () => {
  let component: TotalAmountsTextComponent;
  let fixture: ComponentFixture<TotalAmountsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalAmountsTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalAmountsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
