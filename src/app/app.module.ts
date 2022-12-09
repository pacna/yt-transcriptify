// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// YT Transcription
import { APP_ENV_CONFIG } from './yt-transcription/configs';
import { YTTranscriptionModule } from './yt-transcription';

// Shared
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';

// Self
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    YTTranscriptionModule,
    // standalone
    TopNavComponent,
    AppLayoutComponent,
  ],
  providers: [
    {
      provide: APP_ENV_CONFIG,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
