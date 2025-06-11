import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  releaseDate: string;
  averageRating: number | null;
  director: string;
  casting: { actor: string; role: string, image: string }[];
  synopsis: string;
  trailer_url: string;
}
@Injectable({
  providedIn: 'root'
})

export class MovieService {

  constructor(private http: HttpClient) { }
  movieList(keyword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('cari', keyword);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.xyz/hybrid/160422007/movies.php", urlEncodedData, { headers })
      .pipe(
        tap(response => console.log('movieList response:', response))
      );
  }
  movieDetail(id: number): Observable<any> {
    return this.http.get("https://ubaya.xyz/hybrid/160422007/movies_detail.php?id=" + id);
  }
  addmovie(title: string, genre: string, releaseDate: string, director: string, synopsis:string, rating : number, actor : string, role : string) {
    //this.movies.push({name:p_name,url:p_url,description:p_description,price:p_price})
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('title', title);
    body.set('genre', genre);
    body.set('release_date', releaseDate);
    body.set('director', director);
    body.set('synopsis', synopsis);
    body.set('average_rating', rating.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      "https://ubaya.xyz/hybrid/160422007/newmovie.php", urlEncodedData, { headers });
  }

  updatemovie(id : number ,title: string, genre: string, releaseDate: string, director: string, synopsis:string, rating : number, actor : string, role : string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id',id.toString());
    body.set('title', title);
    body.set('genre', genre);
    body.set('release_date', releaseDate);
    body.set('director', director);
    body.set('synopsis', synopsis);
    body.set('average_rating', rating.toString());
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/update_movie.php", urlEncodedData, { headers });
  }

  deletemovie(p_id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString()); const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/deletemovie.php", urlEncodedData, { headers });
  }
  addInstruction(p_id: number, p_noStep: number, p_instruction: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('movie_id', p_id.toString());
    body.set('step', p_noStep.toString());
    body.set('instruction', p_instruction);
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/add_instruction.php", urlEncodedData, { headers });
  }

  checkLogin(email: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/login_movies.php", urlEncodedData, { headers });
  }

   register(full_name : string, email : string, password : string){
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('nama', full_name);
    body.set('email', email);
    body.set('password', password);
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/register_movies.php", urlEncodedData, { headers });
  }
}
