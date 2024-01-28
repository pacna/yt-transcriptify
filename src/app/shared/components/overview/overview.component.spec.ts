import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { OverviewComponent } from './overview.component';
import { SpiesService } from '../../testing';
import { DownloadService, YoutubeCaptionService } from '../../services';
import { APP_ENV_CONFIG } from '../../../app-env-config';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent, BrowserAnimationsModule],
      providers: [
        { provide: HttpClient, useValue: SpiesService.createHttpClientSpy() },
        {
          provide: YoutubeCaptionService,
          useValue: SpiesService.createYoutubeCaptionServiceSpy(),
        },
        {
          provide: DownloadService,
          useValue: SpiesService.createDownloadServiceSpy(),
        },
        { provide: APP_ENV_CONFIG, useValue: { urlSegment: '/youtube' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
