import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TranscriptionComponent {
  @Input() set transcription(captionSegments: string[]) {
    if (!captionSegments) return;
    this.transcriptions = captionSegments;
  }

  transcriptions: string[] = [];
}
