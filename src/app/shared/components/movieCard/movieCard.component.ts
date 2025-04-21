
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-movie-card',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './movieCard.component.html',
    styleUrls: ['./movieCard.component.css']
})

export class MovieCard { 

    @Input() titulo: string = "";
    @Input() descripcion: string = "";
    @Input() poster: string = "";
    @Output() eliminarPelicula = new EventEmitter<string>();

    eliminar(){
        this.eliminarPelicula.emit(this.titulo);
    }

}