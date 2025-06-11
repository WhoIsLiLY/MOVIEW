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
  addmovie(p_name: string, p_url: string, p_description: string, p_price: number) {
    //this.movies.push({name:p_name,url:p_url,description:p_description,price:p_price})
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();
    return this.http.post(
      "https://ubaya.xyz/hybrid/160422007/new_movie.php", urlEncodedData, { headers });
  }
  updatemovie(p_id: number, p_name: string, p_url: string, p_description: string, p_price: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/update_movie.php", urlEncodedData, { headers });
  }

  deletemovie(p_id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString()); const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/delete_movie.php", urlEncodedData, { headers });
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

  checkLogin(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.xyz/hybrid/160422007/check_login.php", urlEncodedData, { headers });
  }
}
