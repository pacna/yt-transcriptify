// Angular
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Repo
import { mockYtCaptionService } from './../service/mock.services.spec';
import { YoutubeCaptionService } from '../service/youtube-caption.service';
import { YtTranscriptionComponent } from './yt-transcription.component';
import { MockTranscriptionComponent } from './../mock.components.spec';

describe('YtTranscriptionComponent', () => {
  let component: YtTranscriptionComponent;
  let fixture: ComponentFixture<YtTranscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule
      ],
      declarations: [ YtTranscriptionComponent, MockTranscriptionComponent],
      providers: [
        { provide: YoutubeCaptionService, value: mockYtCaptionService}
      ]
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
