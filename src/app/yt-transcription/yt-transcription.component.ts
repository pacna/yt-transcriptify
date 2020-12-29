import { YoutubeCaptionResponse, Event, Seg, YoutubeEventResponse } from './types/yt.types';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { YoutubeCaptionService } from '../service/youtube-caption.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'yt-transcription',
  templateUrl: './yt-transcription.component.html',
  styleUrls: ['./yt-transcription.component.scss']
})
export class YtTranscriptionComponent implements OnInit {
  ytSegments: string[];
  videoDuration: number;
  linkControl = new FormControl(null, [Validators.required]);

  ytLinkGroup = new FormGroup({
    link: this.linkControl
  });

  constructor(private youtubeCaptionService: YoutubeCaptionService) { }

  ngOnInit(): void {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');

    this.getYoutubeCaptions(urlSegments[3]).subscribe((response: YoutubeEventResponse) => {
      this.ytSegments = response.events ? this.getCaptions(response.events) : [];
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

  hasEmptyCaption(segs: Seg[]): boolean {
    const caption: string = this.readableCaption(segs);
    return caption.length === 0;
  }

  readableCaption(segs: Seg[]): string {
    return segs.map((seg: Seg) => seg.utf8.trim()).join(' ');
  }

  getYoutubeCaptions(urlSegment: string): Observable<YoutubeEventResponse | null> {
    return this.youtubeCaptionService.getUrlContent(urlSegment)
            .pipe(
              untilDestroyed(this),
              switchMap((response: string) => {
                const timedTextRegex = new RegExp(/playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/);
                const timedText: string[] = timedTextRegex.exec(response);
                if (!!timedText) {
                  const timedTextUrlSegment: string[] = timedText[1].split(/\\u0026/g);
                  const vid: string = timedTextUrlSegment[0].split('v=')[1];
                  return this.youtubeCaptionService.getCaption(vid, timedTextUrlSegment);
                }

                return of (null);
              })
            );
  }

}
