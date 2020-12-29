import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    ytUrlSegment: string = "/api"
    constructor(private http: HttpClient) {}

    getUrlContent(urlSegment: string): Observable<string> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.get(`${this.ytUrlSegment}/${urlSegment}`,{ headers, responseType: 'text'});
    }

    getCaption(vid: string, urlSegments: string[]): Observable<any> {
        const queryParams: string[] = [];
        urlSegments.forEach((urlSegment: string, index: number) => {
            if (index !== 0) {
                queryParams.push(urlSegment);
            }
        })

        queryParams.push('fmt=json3');

        return this.http.get(`${this.ytUrlSegment}/api/timedtext?v=${vid}&${queryParams.join('&')}`);
    }
}