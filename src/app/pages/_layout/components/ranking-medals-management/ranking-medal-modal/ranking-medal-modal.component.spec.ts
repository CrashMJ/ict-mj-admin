import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMedalModalComponent } from './ranking-medal-modal.component';

describe('RankingMedalModalComponent', () => {
  let component: RankingMedalModalComponent;
  let fixture: ComponentFixture<RankingMedalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingMedalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMedalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
