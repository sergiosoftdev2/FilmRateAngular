import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../../services/models/rating.model';
import { FormsModule } from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  viewProviders: [provideIcons({heroHeart, heroHeartSolid})],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  isLoading: boolean = true;
  movie: any = null;
  anadirCritica: boolean = false;
  numeros: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  movieId: string | null = null;
  userId: string | null = null;
  critica: string = '';
  activeNumero: number = 5;

  isLoggedIn: boolean = false;

  isAlreadyRated: boolean = false;
  isLiked: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.userId = this.apiService.sessionGetter();

    if (!this.userId) {
      console.error('No se pudo obtener userId');
      this.isLoading = false;
      this.isLoggedIn = false;
    }else{
        this.isLoggedIn = true;
    }

    this.apiService.getPelicula(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.checkUserRating();
        this.checkUserLiked();
      },
      error: (error) => {
        console.error('Error al obtener la película:', error);
        this.isLoading = false;
      }
    });
  }

  private checkUserRating(): void {
    if (!this.userId || !this.movieId) return;

    this.apiService.getUserRating(this.userId, this.movieId).subscribe({
      next: (data: any) => {
        if (data && data.rating !== undefined) {
          data = data.rating;
          this.isAlreadyRated = true;
          this.activeNumero = data.rating;
          this.critica = data.critic;
          console.log(data.rating);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener valoraciones:', error);
        this.isLoading = false;
      }
    });
  }

  private checkUserLiked(): void {
    if (!this.userId || !this.movieId) return;
    this.apiService.getUserLike(this.userId, this.movieId).subscribe({
      next: () => {
        this.isLiked = true;
      },
      error: () => {
        this.isLiked = false;
      }
    })
  }

  public setActiveNumero(numero: number): void {
    this.activeNumero = numero;
  }

  public enviarCritica(): void {
    if (!this.userId || !this.movieId) return;

    const nuevaCritica = new Rating(
      this.userId,
      this.movieId,
      this.movie.poster_path,
      this.critica,
      this.activeNumero
    );

    this.apiService.addRating(nuevaCritica).subscribe({
      next: (data) => {
        console.log('Crítica agregada:', data);
        this.isAlreadyRated = true;
      },
      error: (err) => {
        console.error('Error al enviar crítica:', err);
      }
    });
  }

  public addLike(): void{

    let datosLike = {
      user_id: this.userId,
      movie_id: this.movieId
    }

    this.apiService.addLike(datosLike).subscribe({
      next: () => {
        this.isLiked = true;
      },
      error: (error) => {
        console.log(error);
        this.isLiked = false;
      }
    })
  }

  public removeLike(): void{

    let datosLike = {
      user_id: this.userId,
      movie_id: this.movieId
    }

    this.apiService.removeLike(datosLike).subscribe({
      next: () => {
        this.isLiked = false;
      },
      error: () => {
        this.isLiked = true;
      }
    })
  }
}
