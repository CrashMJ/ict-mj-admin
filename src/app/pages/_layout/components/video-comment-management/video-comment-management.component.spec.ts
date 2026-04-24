import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCommentManagementComponent } from './video-comment-management.component';

describe('VideoCommentManagementComponent', () => {
  let component: VideoCommentManagementComponent;
  let fixture: ComponentFixture<VideoCommentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCommentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCommentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
