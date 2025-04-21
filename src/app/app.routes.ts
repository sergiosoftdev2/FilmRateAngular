import { Routes } from '@angular/router';
import { homeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '', component: homeComponent, pathMatch: 'full'}
];
