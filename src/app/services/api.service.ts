import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsIm5iZiI6MTcxMTMyNTkyOS4zMzcsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WLeC1pc9flvHqTMcKv6n4nFMFwmDAAKF972_k8Cz20'
  });

  public getPeliculas() {
    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }
  
}
