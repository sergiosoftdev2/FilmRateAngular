import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-user',
    imports: [CommonModule, RouterLink],
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class userComponent {

    constructor(
        private apiService: ApiService,
        private Router: Router
    ) { }

    misPeliculasCriticadas: any;
    misPeliculasGustadas: any;

    userId:string = "";
    user:any;

    ngOnInit() {

        if(this.apiService.sessionGetter() == null){
            this.Router.navigate(['/login']);
        }else{
            const session = this.apiService.sessionGetter();
            if (session) {
                this.userId = session;
            }
        }

        this.apiService.getProfile(this.userId).subscribe((data: any) => {
            this.user = data;
        })

        this.apiService.getUserRatings(this.userId).subscribe((data: any) => {
            this.misPeliculasCriticadas = data.ratings;
        })

        this.apiService.getUserLikes(this.userId).subscribe((data: any) => {
            this.misPeliculasGustadas = data.ratings;
        })

    }

    getMovieInfo(movie_id: string): string {
        this.apiService.getPelicula(movie_id).subscribe((data: any) => {
            return data.poster_path;
        })
        return "";
    }
}