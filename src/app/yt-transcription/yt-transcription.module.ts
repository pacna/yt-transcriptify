import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranscriptionComponent } from './components/transcription/transcription.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from './components/overview/overview.component';
import { YoutubeCaptionService } from './services/youtube-caption.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [TranscriptionComponent, OverviewComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [OverviewComponent],
  providers: [YoutubeCaptionService],
})
export class YTTranscriptionModule {}