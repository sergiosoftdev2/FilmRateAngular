
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class headerComponent { 

    @Input() titulo: string = "";
    @Input() descripcion: string = "";
    @Input() poster: string = "";
    @Output() eliminarPelicula = new EventEmitter<string>();

    eliminar(){
        this.eliminarPelicula.emit(this.titulo);
    }

}