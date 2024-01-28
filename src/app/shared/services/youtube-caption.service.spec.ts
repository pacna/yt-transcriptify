import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { YoutubeCaptionService } from './youtube-caption.service';
import { APP_ENV_CONFIG } from '../../app-env-config';
import { SpiesService } from '../testing';

describe('YoutubeCaptionService', () => {
  let service: YoutubeCaptionService;
  let http: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YoutubeCaptionService,
        { provide: HttpClient, useValue: SpiesService.createHttpClientSpy() },
        { provide: APP_ENV_CONFIG, useValue: { urlSegment: '/youtube' } },
      ],
    });
    service = TestBed.inject(YoutubeCaptionService);
    http = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoudld get html content', () => {
    // ARRANGE
    const urlSegment: string = 'watch?v=123';
    const mockResponse: string = '<html></html>';
    let expectedResponse: string = null;
    http.get.and.returnValue(of(mockResponse));

    // ACT
    service.getUrlHtmlContent(urlSegment).subscribe((response: string) => {
      expectedResponse = response;
    });

    // ASSERT
    expect(expectedResponse).not.toBe(null);
    expect(expectedResponse).toEqual(mockResponse);
    expect(http.get).toHaveBeenCalled();
  });
});
