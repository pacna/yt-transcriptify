// Angular
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent implements OnInit, OnChanges {
  @Input() captionSegments: string[];
  transcriptions: string[] = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.captionSegments) {
      this.transcriptions = this.captionSegments;
    }
  }

}
