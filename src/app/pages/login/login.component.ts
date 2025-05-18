
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule, RouterLink],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['../register/register.component.css']
})

export class loginComponent {

    constructor(private apiService: ApiService) { }

    public password: string = "";
    public email: string = "";

    ngOnInit() {
        // this.apiService.getPeliculas().subscribe((data: any) => {
            // this.discoverPeliculas = data.results;
        // })
    }

    login(){
        this.apiService.login(this.password, this.email).subscribe(
            (data: any) => {
                this.apiService.sessionSetter(data.userId);
            },
            (error) => {
                console.error('Error en el login:', error);
            }
        );
    }

}