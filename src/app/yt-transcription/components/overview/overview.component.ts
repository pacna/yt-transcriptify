import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { CaptionInfo } from '../../types/caption-info';
import { TranscriptionInfo } from '../../types/transcription-info';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  transcription: TranscriptionInfo = {} as TranscriptionInfo;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  handleCaption(captionInfo: CaptionInfo): void {
    if (captionInfo) {
      this.transcription = {
        captions: captionInfo.captions,
        readableDuration: this.convertToReadableDuration(captionInfo.duration),
      } as TranscriptionInfo;

      this.cdr.detectChanges();
      return;
    }

    this.transcription = null;
  }

  private convertToReadableDuration(duration: number): string {
    const hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const mins: number = Math.floor((duration / (1000 * 60)) % 60);
    const secs: number = Math.floor((duration / 1000) % 60);
    return `${this.formatTime(hours)}:${this.formatTime(
      mins
    )}:${this.formatTime(secs)}`;
  }

  private formatTime(time: number): string {
    const timeString: string = time.toString();
    if (timeString.length === 1) {
      return '0' + timeString;
    }

    return timeString;
  }
}
