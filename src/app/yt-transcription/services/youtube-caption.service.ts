// Angular
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Third party
import { Observable } from 'rxjs';

// Self
import { YoutubeEventResponse } from '../types/youtube-event-response';
import { APP_ENV_CONFIG } from '../configs/app-env-config';

@Injectable()
export class YoutubeCaptionService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_ENV_CONFIG)
    private readonly appEnvConfig: { urlSegment: string }
  ) {}

  getUrlHtmlContent(urlSegment: string): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.get(`${this.appEnvConfig.urlSegment}/${urlSegment}`, {
      headers,
      responseType: 'text',
    });
  }

  getCaptions(
    vid: string,
    urlSegments: string[]
  ): Observable<YoutubeEventResponse> {
    const querySegments: string[] = [];
    urlSegments.forEach((urlSegment: string, index: number) => {
      // already added the youtube url in the url string
      // no need to add it again
      if (!index) {
        return;
      }

      if (urlSegment.includes('lang=')) {
        // set it to english caption
        querySegments.push('lang=en');
        return;
      }

      querySegments.push(urlSegment);
    });

    // format the response to be json
    querySegments.push('fmt=json3');

    return this.http.get<YoutubeEventResponse>(
      `${
        this.appEnvConfig.urlSegment
      }/api/timedtext?v=${vid}&${querySegments.join('&')}`
    );
  }
}
