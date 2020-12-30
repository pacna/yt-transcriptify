// Angular
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Third Party
import { Observable } from 'rxjs';

// Repo
import { YoutubeEventResponse } from '../types/yt.types';
import { UrlSegment } from './../types/url-segment.enum';

@Injectable()
export class YoutubeCaptionService {
    ytUrlSegment = '/youtube';
    constructor(private http: HttpClient) {}

    getUrlContent(urlSegment: string): Observable<string> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'text/plain; charset=utf-8');

        return this.http.get(`${this.ytUrlSegment}/${urlSegment}`, { headers, responseType: 'text'});
    }

    getCaptions(vid: string, urlSegments: string[]): Observable<YoutubeEventResponse> {
        const querySegments: string[] = [];
        urlSegments.forEach((urlSegment: string, index: number) => {
            // already added the youtube url in the url string
            // no need to add it again
            if (index !== UrlSegment.youtubeUrl) {
                querySegments.push(urlSegment);
            }
        });
        // format the response to be json
        querySegments.push('fmt=json3');

        return this.http.get<YoutubeEventResponse>(`${this.ytUrlSegment}/api/timedtext?v=${vid}&${querySegments.join('&')}`);
    }
}
