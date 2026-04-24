import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodSummaryComponent } from './vod-summary.component';

describe('VodSummaryComponent', () => {
  let component: VodSummaryComponent;
  let fixture: ComponentFixture<VodSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
