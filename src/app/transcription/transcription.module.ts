import { TranscriptionComponent } from './transcription.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TranscriptionComponent
  ],
  exports: [
    TranscriptionComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class TranscriptionModule { }
