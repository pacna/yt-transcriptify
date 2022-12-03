import { TestBed } from '@angular/core/testing';

import { YoutubeCaptionService } from './youtube-caption.service';

describe('YoutubeCaptionService', () => {
  let service: YoutubeCaptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YoutubeCaptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
