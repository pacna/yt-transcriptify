import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrl: './transcription.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class TranscriptionComponent {
  @Input() set transcription(captionSegments: string[]) {
    if (!captionSegments) return;
    this.transcriptions = captionSegments;
  }

  transcriptions: string[] = [];
}
