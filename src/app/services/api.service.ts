import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './models/usuario.model';
import { Rating } from './models/rating.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  public privateAPIURL = "http://localhost:4080"
  
  constructor(
    private http: HttpClient,
    private Router: Router
  ) {}

  private headers = new HttpHeaders({
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTYyNGQ2MTZiMDYxMGQ5ZmMxNjRhZWRjM2U5NmVkMyIsIm5iZiI6MTcxMTMyNTkyOS4zMzcsInN1YiI6IjY2MDBjMmU5MDQ3MzNmMDE3ZGVlMjQyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8WLeC1pc9flvHqTMcKv6n4nFMFwmDAAKF972_k8Cz20'
  });

  // API THE MOVIE DB

  public getPelicula(peliculaId: any) {
    let url = `https://api.themoviedb.org/3/movie/${peliculaId}?language=en-US`;
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }

  public getPeliculasPopulares() {
    let url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }

  public getPeliculasMejorValoradas() {
    let url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }

  public getEstrenos(){
    let url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }

  public buscarPeliculas(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    return this.http.get(url, { headers: this.headers });  // Asegúrate de enviar las cabeceras correctamente
  }


  // BBDD
  public getProfile(userId:string){
    const url = `${this.privateAPIURL}/user/${userId}`;
    return this.http.get(url);
  }

  // BBDD: RATINGS 
  public addRating(newRating: Rating) {
    const url = `${this.privateAPIURL}/addRating`;
    return this.http.post(url, {
      datosRating: newRating
    });
  }

  public getUserRating(user_id: string, movie_id: string) {
    const url = `${this.privateAPIURL}/user-movie`;
    return this.http.get(url, {
      params: {
        user_id: user_id,
        movie_id: movie_id
      }
    });
  }

  public getUserRatings(user_id: string) {
    const url = `${this.privateAPIURL}/user-movies`;
    return this.http.get(url, {
      params: {
        user_id: user_id
      }
    });
  }

  public getLastRatings(skip: number) {
    const url = `${this.privateAPIURL}/last-ratings`;
    return this.http.get(url, {
      params: {
        skip: skip,
      }
    });
  }


  // BBDD: LIKES
  public addLike(datosLike: any) {
    const url = `${this.privateAPIURL}/addLike`;
    return this.http.post(url, {
      datosLike: datosLike
    });
  }

  public removeLike(datosLike: any) {
    const url = `${this.privateAPIURL}/removeLike`;
    return this.http.post(url, {
      datosLike: datosLike
    });
  }
  
  public getUserLike(user_id: string, movie_id: string) {
    const url = `${this.privateAPIURL}/user-liked-movie`;
    return this.http.get(url, {
      params: {
        user_id: user_id,
        movie_id: movie_id
      }
    });
  }

  public getUserLikes(user_id: string) {
    const url = `${this.privateAPIURL}/user-liked-movies`;
    return this.http.get(url, {
      params: {
        user_id: user_id,
      }
    });
  }



  // BBDD: USER RELATED
  public login(password: string, email: string) {
    const url = `${this.privateAPIURL}/login`;
    return this.http.post(url, {
      email: email,
      password: password
    });
  }

  public register(usuario: Usuario) {
    const url = `${this.privateAPIURL}/register`;
    return this.http.post(url, {
      datosUsuario: usuario
    });
  }

  public sessionSetter(user_id: string){
    localStorage.setItem('user_id', user_id);
  }

  public sessionGetter() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('user_id');
    }
    return null;
  }
  
  public sessionRemover(){
    localStorage.removeItem('user_id');
    this.Router.navigate(['/login']);
  }

}