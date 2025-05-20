import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SafePipe } from '../../pipes';
import { TranscriptionComponent } from '../transcription';
import { DownloadService, YoutubeCaptionService } from '../../services';
import {
  TranscriptionInfo,
  YoutubeEventResponse,
  Event,
  Seg,
} from '../../types';
import { Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'overview',
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        SafePipe,
        TranscriptionComponent,
    ],
    providers: [YoutubeCaptionService, DownloadService]
})
export class OverviewComponent {
  private _destroyRef: DestroyRef = inject<DestroyRef>(DestroyRef);

  readableDuration: string;
  captionSegments: string[];
  linkControl = new FormControl<string>(null, [Validators.required]);
  ytLinkGroup = new FormGroup({
    link: this.linkControl,
  });

  constructor(
    private readonly youtubeCaptionService: YoutubeCaptionService,
    private readonly downloadService: DownloadService
  ) {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');

    this.getYoutubeCaptions(urlSegments[3]).subscribe({
      next: (response: YoutubeEventResponse) => {
        if (response?.events) {
          const transcription: TranscriptionInfo = this.getCaptionsAndDurations(
            response.events
          );
          this.captionSegments = transcription.captions;
          this.readableDuration = transcription.readableDuration;
        } else {
          this.captionSegments = ['｡ﾟ･ (>﹏<) ･ﾟ｡ Oh no!'];
          this.readableDuration = '--:--:--';
        }
      },
      error: (_) => {
        this.captionSegments = ['｡ﾟ･ (>﹏<) ･ﾟ｡ Oh no!'];
        this.readableDuration = '--:--:--';
      },
    });
  }

  download(): void {
    this.downloadService.download(
      this.captionSegments.join(' '),
      'yt-transcription.txt'
    );
  }

  get youtubeLink(): string {
    return this.linkControl.value.replace('watch?v=', 'embed/');
  }

  shouldShowYoutubeLink(): boolean {
    return this.readableDuration
      ? !this.readableDuration.includes('--:--:--')
      : false;
  }

  private getCaptionsAndDurations(events: Event[]): TranscriptionInfo {
    const captionSegments: string[] = [];
    const hasId: boolean = events[0].id ? true : false; // if we find Id then the total duration exist
    let startingIndex: number = hasId ? 1 : 0;
    let duration: number = hasId ? events[0].dDurationMs : 0;

    for (startingIndex; startingIndex < events.length; startingIndex++) {
      if (!hasId) {
        let subtractedTime: number = events[startingIndex].tStartMs - duration;
        duration += subtractedTime;

        if (startingIndex == events.length - 1) {
          duration = duration + events[startingIndex].dDurationMs;
        }
      }

      const caption: string = this.readableCaption(events[startingIndex].segs);
      if (caption) {
        captionSegments.push(caption);
      }
    }

    return {
      readableDuration: this.convertToReadableDuration(duration),
      captions: captionSegments,
    } as TranscriptionInfo;
  }

  private readableCaption(segs: Seg[]): string {
    return segs.map((seg: Seg) => seg.utf8.trim()).join(' ');
  }

  private getYoutubeCaptions(
    urlSegment: string
  ): Observable<YoutubeEventResponse | null> {
    return this.youtubeCaptionService.getUrlHtmlContent(urlSegment).pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap((response: string) => {
        const timedTextRegex = new RegExp(
          /playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/
        );
        const timedText: string[] = timedTextRegex.exec(response);
        if (!!timedText) {
          const timedTextUrlSegment: string[] = timedText[1].split(/\\u0026/g);
          const vid: string = timedTextUrlSegment[0].split('v=')[1];
          return this.youtubeCaptionService.getCaptions(
            vid,
            timedTextUrlSegment
          );
        }

        return of(null);
      })
    );
  }

  private convertToReadableDuration(duration: number): string {
    const hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const mins: number = Math.floor((duration / (1000 * 60)) % 60);
    const secs: number = Math.floor((duration / 1000) % 60);
    return `${this.formatTime(hours)}:${this.formatTime(
      mins
    )}:${this.formatTime(secs)}`;
  }

  private formatTime(time: number): string {
    const timeString: string = time.toString();
    if (timeString.length === 1) {
      return '0' + timeString;
    }

    return timeString;
  }
}
