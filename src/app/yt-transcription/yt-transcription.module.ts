// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Self
import { TranscriptionComponent } from './components/transcription/transcription.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DownloadService } from './services/download.service';
import { YoutubeCaptionService } from './services/youtube-caption.service';

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
  providers: [YoutubeCaptionService, DownloadService],
})
export class YTTranscriptionModule {}
