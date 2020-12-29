import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UrlService {

    constructor(private http: HttpClient) {}

    getUrlContent(url: string): Observable<any> {

        return this.http.get<any>(url);
    }
}