// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';

// Repo
import { YtTranscriptionModule } from './components/yt-transcription/yt-transcription.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ENV_CONFIG } from './configs/app-env-config';
import { environment } from './../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    YtTranscriptionModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
