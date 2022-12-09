// Angular
import { TestBed } from '@angular/core/testing';

// Shared
import { MockAppLayoutComponent, MockTopNavComponent } from './shared/testing';

// YT Transcription
import { MockOverviewComponent } from './yt-transcription/testing';

// Self
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockAppLayoutComponent,
        MockTopNavComponent,
        MockOverviewComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
