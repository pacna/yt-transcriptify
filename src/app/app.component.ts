import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from './shared/components/top-nav';
import { AppLayoutComponent } from './shared/components/app-layout';
import { OverviewComponent } from './shared/components/overview';
import { APP_ENV_CONFIG } from './app-env-config';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    TopNavComponent,
    AppLayoutComponent,
    OverviewComponent,
  ],
  providers: [
    {
      provide: APP_ENV_CONFIG,
      useValue: environment,
    },
  ],
})
export class AppComponent {}
