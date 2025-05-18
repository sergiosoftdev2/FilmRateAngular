
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../services/models/usuario.model';
import { RouterLink, Router } from '@angular/router';


@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, RouterLink],
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class registerComponent {

    constructor(
        private apiService: ApiService,
        private Router: Router
    ) { }

    public emailFound: boolean = false;

    public password: string = "";
    public username: string = "";
    public email: string = "";
    public nombre: string = "";
    public apellidos: string = "";
    public fecha_nacimiento: Date = new Date();
    public imagen: string = "";

    ngOnInit() {
        if(this.apiService.sessionGetter() !== null){
            this.Router.navigate(['/user']);
        }
    }

    register(){

        let usuario: Usuario = {
            nombre: this.nombre,
            username: this.username,
            apellidos: this.apellidos,
            email: this.email,
            password: this.password,
            fecha_nacimiento: this.fecha_nacimiento,
            imagen: this.imagen
        }

        this.apiService.register(usuario).subscribe(
            (data: any) => {
                this.apiService.sessionSetter(data.userId);
                this.Router.navigate(['/user']);
            },
            (error) => {
                if (error.status === 409) {
                  this.emailFound = true;
                } else {
                  console.error('Error general al registrar:', error);
                }
              }
        );
    }

}