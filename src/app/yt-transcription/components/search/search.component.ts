import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of, switchMap } from 'rxjs';
import { YoutubeCaptionService } from '../../services/youtube-caption.service';
import { Seg } from '../../types/seg';
import { Event } from '../../types/event';
import { YoutubeEventResponse } from '../../types/youtube-event-response';
import { CaptionInfo } from '../../types/caption-info';

@UntilDestroy()
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() updateCaption: EventEmitter<CaptionInfo> =
    new EventEmitter<CaptionInfo>();
  videoDuration: number;
  captionSegments: string[];
  linkControl = new FormControl<string>(null, [Validators.required]);
  ytLinkGroup = new FormGroup<{ link: FormControl<string> }>({
    link: this.linkControl,
  });

  constructor(private readonly youtubeCaptionService: YoutubeCaptionService) {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');

    this.getYoutubeCaptions(urlSegments[3]).subscribe(
      (response: YoutubeEventResponse) => {
        this.updateCaption.emit(
          response?.events
            ? this.getCaptionsAndDurations(response.events)
            : null
        );
      },
      (_) => {
        console.log('hi');
        this.updateCaption.emit(null);
      }
    );
  }

  private getCaptionsAndDurations(events: Event[]): CaptionInfo {
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
      duration: duration,
      captions: captionSegments,
    } as CaptionInfo;
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
