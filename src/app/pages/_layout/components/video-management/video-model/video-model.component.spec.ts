import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoModelComponent } from './video-model.component';

describe('VideoModelComponent', () => {
  let component: VideoModelComponent;
  let fixture: ComponentFixture<VideoModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
