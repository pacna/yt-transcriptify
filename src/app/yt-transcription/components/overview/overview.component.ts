import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, switchMap } from 'rxjs';
import { YoutubeCaptionService } from '../../services/youtube-caption.service';
import { YoutubeEventResponse } from '../../types/youtube-event-response';
import { Event, Seg, TranscriptionInfo } from './../../types';

@UntilDestroy()
@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  readableDuration: string;
  captionSegments: string[];
  linkControl = new FormControl<string>(null, [Validators.required]);
  ytLinkGroup = new FormGroup<{ link: FormControl<string> }>({
    link: this.linkControl,
  });

  constructor(private readonly youtubeCaptionService: YoutubeCaptionService) {}

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
      untilDestroyed(this),
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
