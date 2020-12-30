import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent implements OnInit, OnChanges {
  @Input() ytSegments: string[];
  transcriptions: string[] = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.ytSegments) {
      this.transcriptions = this.ytSegments;
    }
  }

}
