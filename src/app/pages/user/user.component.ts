import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tabComponent } from '../../shared/components/tab/tab.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserPlus } from '@ng-icons/heroicons/outline';
import { heroUsersSolid } from '@ng-icons/heroicons/solid';

@Component({
    selector: 'app-user',
    imports: [CommonModule, RouterLink, tabComponent, NgIcon],
    standalone: true,
    templateUrl: './user.component.html',
    viewProviders: [provideIcons({heroUsersSolid, heroUserPlus})],
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
    misPeliculasWatchList: any;

    activeTab: string = 'Ratings';

    userId:string = "";
    user:any;
    isSameUser:boolean = false;
    isAlreadyFollowing:boolean = false;
    userFollowers: number = 0;
    userFollowings: number = 0;

    ngOnInit() {

        if(this.apiService.sessionGetter() == null){
            this.Router.navigate(['/login']);
        }else{
            const session = this.apiService.sessionGetter();
            if (this.route.snapshot.paramMap.get('id') == null) {
                this.userId = session as string;
                this.isSameUser = true;
            }else{
                this.userId = this.route.snapshot.paramMap.get('id') as string;
            }
        }

        this.apiService.getProfile(this.userId).subscribe((data: any) => {
            this.user = data;
            this.isUserFollowed();
            this.followersCount();
            this.followingsCount();
        })

        this.apiService.getUserRatings(this.userId).subscribe((data: any) => {
            this.misPeliculasCriticadas = data.ratings;
        })

        this.apiService.getUserLikes(this.userId).subscribe((data: any) => {
            this.misPeliculasGustadas = data.likedMovies;
            this.misPeliculasGustadas.forEach((movie: any) => {
                this.apiService.getPelicula(movie.movie_id).subscribe((data: any) => {
                    movie.movie_poster = data.poster_path;
                })
            });
        })

        this.apiService.getUserWatchListedMovies(this.userId).subscribe((data: any) => {
            this.misPeliculasWatchList = data.watchlistMovies;
            this.misPeliculasWatchList.forEach((movie: any) => {
                this.apiService.getPelicula(movie.movie_id).subscribe((data: any) => {
                    movie.movie_poster = data.poster_path;
                })
            });
        })

    }

    setActiveTab(tabTitle: string) {
        this.activeTab = tabTitle;
    }

    followUser(){
        this.apiService.addFollow(this.userId, this.apiService.sessionGetter() as string).subscribe((data: any) => {
            this.isAlreadyFollowing = true;
        })
    }

    unfollowUser(){
        this.apiService.removeFollow(this.userId, this.apiService.sessionGetter() as string).subscribe((data: any) => {
            this.isAlreadyFollowing = false;
        })
    }

    isUserFollowed(){
        this.apiService.isUserFollowing(this.userId, this.apiService.sessionGetter() as string).subscribe((data: any) => {
            if(data.following){
                this.isAlreadyFollowing = true;
            }
        })
    }

    followersCount(){
        this.apiService.userFollowersCount(this.userId).subscribe((data: any) => {
            this.userFollowers = data.followers;
        })
    }

    followingsCount(){
        this.apiService.userFollowingsCount(this.userId).subscribe((data: any) => {
            this.userFollowings = data.followings;
        })
    }

}