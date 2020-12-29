import { YoutubeCaptionService } from '../service/youtube-caption.service';
import { YtTranscriberComponent } from './yt-transcriber.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    YtTranscriberComponent
  ],
  exports: [
    YtTranscriberComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    YoutubeCaptionService
  ]
})
export class YtTranscriberModule { }
