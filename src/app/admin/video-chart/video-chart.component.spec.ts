import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoChartComponent } from './video-chart.component';

describe('VideoChartComponent', () => {
  let component: VideoChartComponent;
  let fixture: ComponentFixture<VideoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
