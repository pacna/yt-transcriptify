// Angular
import { InjectionToken } from '@angular/core';

export const APP_ENV_CONFIG: InjectionToken<{
  production: boolean;
  urlSegment: string;
}> = new InjectionToken<{ production: boolean; urlSegment: string }>(
  'APP_ENV_CONFIG'
);
