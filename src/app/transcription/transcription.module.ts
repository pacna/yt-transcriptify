// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Repo
import { TranscriptionComponent } from './transcription.component';

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
