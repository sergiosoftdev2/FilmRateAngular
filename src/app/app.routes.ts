import { Routes } from '@angular/router';
import { searchComponent } from './pages/search/search.component';
import { userComponent } from './pages/user/user.component';
import { loginComponent } from './pages/login/login.component';
import { registerComponent } from './pages/register/register.component';
import { homeComponent } from './pages/home/home.component';
import { movieComponent } from './pages/movie/movie.component';

export const routes: Routes = [
    {path: '', component: homeComponent},
    {path: 'search', component: searchComponent},
    {path: 'user', component: userComponent},
    {path: 'login', component: loginComponent},
    {path: 'register', component: registerComponent},
    {path: 'movie/:id', component: movieComponent},
];
