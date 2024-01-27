import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpiesService } from '../../testing';
import { DownloadService, YoutubeCaptionService } from '../../services';
import { APP_ENV_CONFIG } from '../../../app-env-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverviewComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
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
