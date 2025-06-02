
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHeart, heroUsers, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { heroHeartSolid, heroUsersSolid, heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, RouterLink, NgIcon],
    viewProviders: [provideIcons({heroHeart, heroHeartSolid, heroUsers, heroMagnifyingGlass, heroUsersSolid, heroMagnifyingGlassSolid})],
    standalone: true,
    templateUrl: './explore.component.html',
})

export class ExploreComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }
  
  lastRatings: any[] = [];
  followingsRatings: any[] = [];
  skipped = 0;
  activeTab: string = 'explore';
  isLoading = true;

  ngOnInit() {
    this.getLastRatings();
  }

  // Método para cambiar la pestaña activa
  setActiveTab(tabName: string) {
    this.activeTab = tabName;
    
    // Lógica adicional según la pestaña seleccionada
    if (tabName === 'explore') {
      this.getLastRatings();
    } else if (tabName === 'following') {

      let followedUsers: string[] = [];

      this.apiService.userFollowings(this.apiService.sessionGetter() as string).subscribe((data: any) => {
        data.followings.forEach((following: any) => {
          followedUsers.push(following.following_user_id);
        })

        this.apiService.getUsersRatings(followedUsers).subscribe((data: any) => {
          this.followingsRatings = data.ratings;
          this.followingsRatings.forEach((rating: any) => {
            this.apiService.getProfile(rating.user_id).subscribe((profileData: any) => {
              rating.profile = profileData;
            });
            this.apiService.getPelicula(rating.movie_id).subscribe((movieData: any) => {
              rating.movie = movieData;
            })
          });
        })

      })
    }
  }

  getLastRatings(){
    this.apiService.getLastRatings(0).subscribe((data: any) => {
      this.lastRatings = data.ratings;
      this.lastRatings.forEach((rating: any) => {
        this.apiService.getProfile(rating.user_id).subscribe((profileData: any) => {
          rating.profile = profileData;
        });
        this.apiService.getPelicula(rating.movie_id).subscribe((movieData: any) => {
          rating.movie = movieData;
        })
      });
      this.isLoading = false;
    });
  }
  
}