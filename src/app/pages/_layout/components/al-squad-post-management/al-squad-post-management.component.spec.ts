import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlSquadPostManagementComponent } from './al-squad-post-management.component';

describe('AlSquadPostManagementComponent', () => {
  let component: AlSquadPostManagementComponent;
  let fixture: ComponentFixture<AlSquadPostManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlSquadPostManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlSquadPostManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
