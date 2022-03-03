// Angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Repo
import { TranscriptionModule } from '../transcription/transcription.module';
import { YoutubeCaptionService } from '../../services/youtube-caption.service';
import { YtTranscriptionComponent } from './yt-transcription.component';

@NgModule({
  declarations: [YtTranscriptionComponent],
  exports: [YtTranscriptionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    TranscriptionModule,
  ],
  providers: [YoutubeCaptionService],
})
export class YtTranscriptionModule {}
