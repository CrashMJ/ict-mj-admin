import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingMedalsManagementComponent } from './ranking-medals-management.component';

describe('RankingMedalsManagementComponent', () => {
  let component: RankingMedalsManagementComponent;
  let fixture: ComponentFixture<RankingMedalsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingMedalsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingMedalsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
