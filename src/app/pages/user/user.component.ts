import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class userComponent {

    constructor(
        private apiService: ApiService,
        private Router: Router
    ) { }

    misPeliculas: any;
    userId:string = "";
    user:any;

    ngOnInit() {

        if(this.apiService.sessionGetter() == null){
            this.Router.navigate(['/login']);
        }else{
            const session = this.apiService.sessionGetter();
            if (session) {
                this.userId = session;
            }
        }

        this.apiService.getProfile(this.userId).subscribe((data: any) => {
            this.user = data;
        })

        this.apiService.getPeliculasPopulares().subscribe((data: any) => {
            this.misPeliculas = data.results;
        })

    }
}