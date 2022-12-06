// Angular
import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {
  constructor() {}

  download(text: string, filename: string): void {
    const blob: Blob = new Blob([text], { type: 'text/plain' });

    const el: HTMLAnchorElement = window.document.createElement('a');
    el.href = window.URL.createObjectURL(blob);
    el.download = filename;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }
}
