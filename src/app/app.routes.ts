import { Routes } from '@angular/router';
import { homeComponent } from './pages/home/home.component';
import { userComponent } from './pages/user/user.component';
import { loginComponent } from './pages/login/login.component';
import { registerComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path: '', component: homeComponent},
    {path: 'home', component: homeComponent},
    {path: 'user', component: userComponent},
    {path: 'login', component: loginComponent},
    {path: 'register', component: registerComponent},
];
