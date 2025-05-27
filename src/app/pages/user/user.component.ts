import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tabComponent } from '../../shared/components/tab/tab.component';

@Component({
    selector: 'app-user',
    imports: [CommonModule, RouterLink, tabComponent],
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class userComponent {

    constructor(
        private apiService: ApiService,
        private Router: Router,
        private route: ActivatedRoute
    ) { }

    misPeliculasCriticadas: any;
    misPeliculasGustadas: any;

    activeTab: string = 'Últimos Críticas';

    userId:string = "";
    user:any;

    ngOnInit() {

        if(this.apiService.sessionGetter() == null){
            this.Router.navigate(['/login']);
        }else{
            const session = this.apiService.sessionGetter();
            if (this.route.snapshot.paramMap.get('id') == null) {
                this.userId = session as string;
            }else{
                this.userId = this.route.snapshot.paramMap.get('id') as string;
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

    setActiveTab(tabTitle: string) {
        this.activeTab = tabTitle;
    }
}