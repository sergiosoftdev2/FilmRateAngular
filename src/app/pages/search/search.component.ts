
import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MovieCard } from '../../shared/components/movieCard/movieCard.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-home',
    imports: [CommonModule, MovieCard, NgForOf, FormsModule, RouterLink],
    standalone: true,
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class searchComponent {

    public buscadorPeliculas = "";
    public discoverPeliculas: any;
    public isOpenModal: boolean = false;

    constructor(private apiService: ApiService) { }

    public title = 'mi Prueba';
    public nombrePelicula = "";
    public peliculaSeleccionada: any;

    public cambiarTitulo() {
        this.title = this.title === "mi Prueba" ? "Hola Mundo!" : "mi Prueba";
    }

    ngOnInit() {
        this.apiService.getPeliculasPopulares().subscribe((data: any) => {
            this.discoverPeliculas = data.results;
        })
    }

    buscarPelicula(){
        if(this.buscadorPeliculas.length > 0) {
            this.apiService.buscarPeliculas(this.buscadorPeliculas).subscribe((data: any) => {
                this.discoverPeliculas = data.results;
            });
        }else{
            this.ngOnInit();
        }
    }

}