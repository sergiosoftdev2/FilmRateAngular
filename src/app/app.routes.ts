import { Routes } from '@angular/router';
import { homeComponent } from './pages/home/home.component';
import { userComponent } from './pages/user/user.component';

export const routes: Routes = [
    {path: '', component: homeComponent},
    {path: 'home', component: homeComponent},
    {path: 'user', component: userComponent}
];
