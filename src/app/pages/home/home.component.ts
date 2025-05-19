
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { register } from 'swiper/element/bundle'
import { RouterLink } from '@angular/router';

register();

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterLink],
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    host: {ngSkipHydration: 'true'},
})

export class homeComponent {

  constructor(private apiService: ApiService) { }

  peliculasPopulares: any[] = [];
  peliculasMejorValoradas: any[] = [];
  proximosEstrenos: any[] = [];
  
  ngOnInit() {

    this.apiService.getPeliculasPopulares().subscribe((data: any) => {
      data.results.forEach((element: any) => {
        if(element){
          this.peliculasPopulares.push(element);
        }
      });
    })

    this.apiService.getPeliculasMejorValoradas().subscribe((data: any) => {
      data.results.forEach((element: any) => {
        if(element){
          this.peliculasMejorValoradas.push(element);
        }
      });
    })

    this.apiService.getEstrenos().subscribe((data: any) => {
      data.results.forEach((element: any) => {
        if(element){
          this.proximosEstrenos.push(element);
        }
      });
    })

  }

}