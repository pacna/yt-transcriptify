import { TranscriptionModule } from './../transcription/transcription.module';
import { YoutubeCaptionService } from '../service/youtube-caption.service';
import { YtTranscriptionComponent } from './yt-transcription.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    YtTranscriptionComponent
  ],
  exports: [
    YtTranscriptionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    TranscriptionModule
  ],
  providers: [
    YoutubeCaptionService
  ]
})
export class YtTranscriptionModule { }
