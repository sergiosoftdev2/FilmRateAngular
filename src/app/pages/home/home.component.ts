
import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ModalDialogComponent } from '../../shared/components/modal-dialog/modal-dialog.component';
import { MovieCard } from '../../shared/components/movieCard/movieCard.component';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-home',
    imports: [CommonModule, ModalDialogComponent, MovieCard, NgForOf, FormsModule],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class homeComponent {

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
        this.apiService.getPeliculas().subscribe((data: any) => {
            this.discoverPeliculas = data.results;
        })
    }

    closeModal() {
        this.isOpenModal = false;
    }

    openModal(pelicula: any) {
        this.isOpenModal = true;
        this.peliculaSeleccionada = pelicula;
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