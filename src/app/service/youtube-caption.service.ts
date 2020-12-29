import { YoutubeEventResponse } from '../yt-transcriber/types/yt.types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class YoutubeCaptionService {
    ytUrlSegment = '/youtube';
    constructor(private http: HttpClient) {}

    getUrlContent(urlSegment: string): Observable<string> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'text/plain; charset=utf-8');

        return this.http.get(`${this.ytUrlSegment}/${urlSegment}`, { headers, responseType: 'text'});
    }

    getCaption(vid: string, urlSegments: string[]): Observable<YoutubeEventResponse> {
        const querySegments: string[] = [];
        urlSegments.forEach((urlSegment: string, index: number) => {
            if (index !== 0) {
                querySegments.push(urlSegment);
            }
        });

        querySegments.push('fmt=json3');

        return this.http.get<YoutubeEventResponse>(`${this.ytUrlSegment}/api/timedtext?v=${vid}&${querySegments.join('&')}`);
    }
}
