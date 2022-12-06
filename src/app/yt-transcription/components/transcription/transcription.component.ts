// Angular
import { Component, Input } from '@angular/core';

@Component({
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss'],
})
export class TranscriptionComponent {
  @Input() set transcription(captionSegments: string[]) {
    if (!captionSegments) return;
    this.transcriptions = captionSegments;
  }

  transcriptions: string[] = [];
}
