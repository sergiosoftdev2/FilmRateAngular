
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterLink],
    standalone: true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class headerComponent {
    
    constructor(
        private apiService: ApiService,
    ) { }

    @Input() titulo: string = "";
    @Input() descripcion: string = "";
    @Input() poster: string = "";
    @Output() eliminarPelicula = new EventEmitter<string>();

    isLoggedIn: boolean = false;

    eliminar(){
        this.eliminarPelicula.emit(this.titulo);
    }

    logOut(){
        this.apiService.sessionRemover();
        this.isLoggedIn = false;
    }

    ngOnInit() {
        if(this.apiService.sessionGetter() !== null){
            this.isLoggedIn = true;
        }else{
            this.isLoggedIn = false;
        }

        console.log(this.isLoggedIn);
    }

}