import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-home',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class userComponent {

    misPeliculas: any;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getPeliculas().subscribe((data: any) => {
            console.log(data.results);
            this.misPeliculas = data.results;
        })
    }
}