// Angular
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

// Third Party
import * as download from 'downloadjs';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// Others
import { Event, Seg, YoutubeEventResponse } from '../../types/api';
import { YoutubeCaptionService } from '../../services/youtube-caption.service';

@UntilDestroy()
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'yt-transcription',
  templateUrl: './yt-transcription.component.html',
  styleUrls: ['./yt-transcription.component.scss'],
})
export class YtTranscriptionComponent implements OnInit {
  captionSegments: string[];
  videoDuration: number;
  canShowInfoOption = false;
  linkControl = new UntypedFormControl(null, [Validators.required]);

  ytLinkGroup = new UntypedFormGroup({
    link: this.linkControl,
  });

  constructor(private youtubeCaptionService: YoutubeCaptionService) {}

  ngOnInit(): void {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');

    this.getYoutubeCaptions(urlSegments[3]).subscribe(
      (response: YoutubeEventResponse) => {
        // if the input is either incorrect or there isn't any cc in the youtube video
        // then ｡ﾟ･ (>﹏<) ･ﾟ｡
        this.captionSegments = response?.events
          ? this.getCaptions(response.events)
          : ['｡ﾟ･ (>﹏<) ･ﾟ｡ Oh no!'];
        this.videoDuration = response?.events ? this.videoDuration : 0;
        this.canShowInfoOption = true;
      }
    );
  }

  getCaptions(events: Event[]): string[] {
    const captionSegments: string[] = [];

    events.forEach((event: Event) => {
      if (!event.segs) {
        this.videoDuration = event.dDurationMs;
      } else if (this.hasEmptyCaption(event.segs)) {
        return;
      } else {
        captionSegments.push(this.readableCaption(event.segs));
      }
    });

    return captionSegments;
  }

  get duration(): string {
    const hours: number = Math.floor(
      (this.videoDuration / (1000 * 60 * 60)) % 24
    );
    const mins: number = Math.floor((this.videoDuration / (1000 * 60)) % 60);
    const secs: number = Math.floor((this.videoDuration / 1000) % 60);
    return `${this.formatTime(hours)}:${this.formatTime(
      mins
    )}:${this.formatTime(secs)}`;
  }

  formatTime(time: number): string {
    const timeString: string = time.toString();
    if (timeString.length === 1) {
      return '0' + timeString;
    }

    return timeString;
  }

  download(): void {
    const transcription: string = this.captionSegments.join(' ');
    download(transcription, 'yt-transcription.txt', 'text/plain');
  }

  hasEmptyCaption(segs: Seg[]): boolean {
    const caption: string = this.readableCaption(segs);
    return caption.length === 0;
  }

  readableCaption(segs: Seg[]): string {
    return segs.map((seg: Seg) => seg.utf8.trim()).join(' ');
  }

  getYoutubeCaptions(
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
}
