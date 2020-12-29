import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YtTranscriptionComponent } from './yt-transcription.component';

describe('YtTranscriptionComponent', () => {
  let component: YtTranscriptionComponent;
  let fixture: ComponentFixture<YtTranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YtTranscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YtTranscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
