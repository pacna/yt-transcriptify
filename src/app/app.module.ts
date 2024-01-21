import { APP_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ENV_CONFIG } from './app-env-config';
import { TopNavComponent } from './shared/components/top-nav/top-nav.component';
import { AppLayoutComponent } from './shared/components/app-layout/app-layout.component';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { OverviewComponent } from './shared/components/overview/overview.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    // standalone
    TopNavComponent,
    AppLayoutComponent,
    OverviewComponent,
  ],
  providers: [
    {
      provide: APP_ENV_CONFIG,
      useValue: environment,
    },
    {
      provide: APP_ID,
      useValue: 'serverApp',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
