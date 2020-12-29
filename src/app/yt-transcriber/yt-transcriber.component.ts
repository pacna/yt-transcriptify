import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from '../service/api.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'yt-transcriber',
  templateUrl: './yt-transcriber.component.html',
  styleUrls: ['./yt-transcriber.component.scss']
})
export class YtTranscriberComponent implements OnInit {
  linkControl = new FormControl(null, [Validators.required]);

  ytLinkGroup = new FormGroup({
    link: this.linkControl
  });

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {}

  submit(): void {
    const urlSegments: string[] = this.linkControl.value.split('/');
    this.getYoutubeCaption(urlSegments[3]).subscribe((response) => {
      console.log('response', response);
    });
  }

  getYoutubeCaption(urlSegment: string): Observable<any> {
    return this.apiService.getUrlContent(urlSegment)
            .pipe(
              untilDestroyed(this),
              switchMap((response: string) => {
                const timedTextRegex = new RegExp(/playerCaptionsTracklistRenderer.*?(youtube.com\/api\/timedtext.*?)"/);
                const timedText: string[] = timedTextRegex.exec(response);
                if (!!timedText) {
                  const timedTextUrlSegment: string[] = timedText[1].split(/\\u0026/g);
                  const vid: string = timedTextUrlSegment[0].split('v=')[1];
                  return this.apiService.getCaption(vid, timedTextUrlSegment);
                }
              })
            );
  }

}
