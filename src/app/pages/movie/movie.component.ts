import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../../services/models/rating.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-movie',
    imports: [CommonModule, FormsModule],
    standalone: true,
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})

export class movieComponent {

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute
    ) { }

    isLoading = true;
    movie: any;
    anadirCritica = false;
    numeros = Array.from({ length: 10 }, (_, i) => i + 1);

    movieId: any;
    userId: any;
    critica: any;
    activeNumero: number = 5;

    ngOnInit() {
        this.movieId = this.route.snapshot.paramMap.get('id');
        this.userId = this.apiService.sessionGetter();
        this.apiService.getPelicula(this.movieId).subscribe(
            (data) => {
                this.movie = data;
                console.log(this.movie);
                this.isLoading = false;
            },
            (error) => {
                console.error('Error fetching movie:', error);
                this.isLoading = false;
            }
        );

    }

    addCritica() {
        let newRating = new Rating(
            this.userId,
            this.movieId,
            this.critica,
            this.activeNumero,
        )

        this.apiService.addRating(newRating).subscribe(
            (data) => {
                console.log(data)
                console.log("Rating creado")
            },
            (error) => {
                console.error('Error creating rating:', error);
            }
        )
        
    }

    toggleActiveNumero(numero: number) {
        this.activeNumero = this.activeNumero = numero;
    }
}