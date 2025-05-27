
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
      // Aquí puedes añadir la lógica para cargar los datos de 'following'
      // Por ejemplo:
      // this.apiService.getFollowingContent().subscribe((data: any) => {
      //   this.followingContent = data;
      // });
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

      console.log(this.lastRatings);
      this.isLoading = false;
    });
  }
  
}