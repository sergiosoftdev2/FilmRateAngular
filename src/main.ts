import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http';
import { headerComponent } from './app/shared/components/header/header.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
