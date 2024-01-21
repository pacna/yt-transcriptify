import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpiesService } from '../../testing';
import { YoutubeCaptionService, DownloadService } from '../../services';
import { OverviewComponent } from './overview.component';
import { APP_ENV_CONFIG } from '../../../app-env-config';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        OverviewComponent,
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
