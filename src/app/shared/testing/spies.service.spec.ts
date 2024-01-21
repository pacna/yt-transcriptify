import { HttpClient } from '@angular/common/http';
import { YoutubeCaptionService, DownloadService } from '../services';

export class SpiesService {
  static createYoutubeCaptionServiceSpy(): jasmine.SpyObj<YoutubeCaptionService> {
    return jasmine.createSpyObj<YoutubeCaptionService>(
      'YoutubeCaptionService',
      ['getCaptions', 'getUrlHtmlContent']
    );
  }

  static createDownloadServiceSpy(): jasmine.SpyObj<DownloadService> {
    return jasmine.createSpyObj<DownloadService>('DownloadService', [
      'download',
    ]);
  }

  static createHttpClientSpy(): jasmine.SpyObj<HttpClient> {
    return jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);
  }
}
