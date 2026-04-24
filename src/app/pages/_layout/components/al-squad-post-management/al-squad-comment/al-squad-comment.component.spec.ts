import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlSquadCommentComponent } from './al-squad-comment.component';

describe('AlSquadCommentComponent', () => {
  let component: AlSquadCommentComponent;
  let fixture: ComponentFixture<AlSquadCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlSquadCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlSquadCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
