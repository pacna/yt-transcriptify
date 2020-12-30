// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Third Party
import * as moment from 'moment';
import * as download from 'downloadjs';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// Others
import { Event, Seg, YoutubeEventResponse } from '../types/yt.types';
import { YoutubeCaptionService } from '../service/youtube-caption.service';

@UntilDestroy()
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'yt-transcription',
  templateUrl: './yt-transcription.component.html',
  styleUrls: ['./yt-transcription.component.scss']
})
export class YtTranscriptionComponent implements OnInit {
  captionSegments: string[];
  videoDuration: number;
  canShowInfoOption = false;
  linkControl = new FormControl(null, [Validators.required]);

  ytLinkGroup = new FormGroup({
    link: this.linkControl
  });

  constructor(private youtubeCaptionService: YoutubeCaptionService) { }

  ngOnInit(): void {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');

    this.getYoutubeCaptions(urlSegments[3]).subscribe((response: YoutubeEventResponse) => {
      // if the input is either incorrect or there isn't any cc in the youtube video
      // then ｡ﾟ･ (>﹏<) ･ﾟ｡
      this.captionSegments = response?.events ? this.getCaptions(response.events) : ['｡ﾟ･ (>﹏<) ･ﾟ｡ Oh no!'];
      this.canShowInfoOption = true;
    });
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
    const time: moment.Duration = moment.duration(this.videoDuration);
    return `${this.formatTime(time.hours())}:${this.formatTime(time.minutes())}:${this.formatTime(time.seconds())}`;
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

  getYoutubeCaptions(urlSegment: string): Observable<YoutubeEventResponse | null> {
    return this.youtubeCaptionService.getUrlHtmlContent(urlSegment)
            .pipe(
              untilDestroyed(this),
              switchMap((response: string) => {
                const timedTextRegex = new RegExp(/playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/);
                const timedText: string[] = timedTextRegex.exec(response);
                if (!!timedText) {
                  const timedTextUrlSegment: string[] = timedText[1].split(/\\u0026/g);
                  const vid: string = timedTextUrlSegment[0].split('v=')[1];
                  return this.youtubeCaptionService.getCaptions(vid, timedTextUrlSegment);
                }

                return of (null);
              })
            );
  }

}
