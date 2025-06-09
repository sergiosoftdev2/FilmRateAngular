
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ChangeDetectorRef } from '@angular/core';

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
        private cdr: ChangeDetectorRef
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
        this.updateLoginStatus();
    }

    ngOnChanges(){
        this.updateLoginStatus();
    }

    updateLoginStatus() {
        this.isLoggedIn = this.apiService.sessionGetter() !== null;
        this.cdr.detectChanges();
    }

}