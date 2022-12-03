import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { YTTranscriptionModule } from './yt-transcription';
import { APP_ENV_CONFIG } from './yt-transcription/configs';
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
