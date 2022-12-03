import { Component, Input } from '@angular/core';
import { TranscriptionInfo } from '../../types/transcription-info';

@Component({
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss'],
})
export class TranscriptionComponent {
  @Input() set transcription(transcription: TranscriptionInfo) {
    if (transcription == null) {
      this.transcriptions = ['｡ﾟ･ (>﹏<) ･ﾟ｡ Oh no!'];
    } else {
      this.transcriptions = transcription.captions;
    }
  }

  transcriptions: string[] = [];
}
