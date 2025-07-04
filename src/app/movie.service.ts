import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  release_date: string;
  average_rating: number | null;
  director: string;
  casting: { actor: string; role: string; image: string }[];
  synopsis: string;
  trailer_url: string;
}
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  movieList(keyword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('cari', keyword);
    const urlEncodedData = body.toString();
    return this.http
      .post('https://ubaya.xyz/hybrid/160422007/movies.php', urlEncodedData, {
        headers,
      })
      .pipe(tap((response) => console.log('movieList response:', response)));
  }
  movieDetail(id: number): Observable<any> {
    return this.http.get(
      'https://ubaya.xyz/hybrid/160422007/movies_detail.php?id=' + id
    );
  }
  addmovie(
    title: string,
    genre: string,
    poster: string,
    releaseDate: string,
    director: string,
    synopsis: string,
    rating: number,
    actor: string[],
    role: string[],
    image: string[],
    trailer: string
  ) {
    //this.movies.push({name:p_name,url:p_url,description:p_description,price:p_price})
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('title', title);
    body.set('genre', genre);
    body.set('poster', poster);
    body.set('release_date', releaseDate);
    body.set('director', director);
    body.set('synopsis', synopsis);
    body.set('average_rating', rating.toString());
    body.set('trailer', trailer);
    actor.forEach((a) => body.append('actor[]', a));
    role.forEach((r) => body.append('role[]', r));
    image.forEach((img) => body.append('image[]', img));
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/newmovie.php',
      urlEncodedData,
      { headers }
    );
  }

  addmovieForm(formData: FormData) {
    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/newmovie.php',
      formData
    );
  }

  updatemovieForm(formData: FormData) {
    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/editmovie.php',
      formData
    );
  }
  updatemovie(
    id: number,
    title: string,
    genre: string,
    poster: string,
    releaseDate: string,
    director: string,
    synopsis: string,
    rating: number,
    actor: string[],
    role: string[],
    image: string[],
    trailer: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', id.toString());
    body.set('title', title);
    body.set('genre', genre);
    body.set('poster', poster);
    body.set('release_date', releaseDate);
    body.set('director', director);
    body.set('synopsis', synopsis);
    body.set('average_rating', rating.toString());
    body.set('trailer', trailer);
    actor.forEach((a) => body.append('actor[]', a));
    role.forEach((r) => body.append('role[]', r));
    image.forEach((img) => body.append('image[]', img));
    const urlEncodedData = body.toString();

    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/editmovie.php',
      urlEncodedData,
      { headers }
    );
  }

  deletemovie(p_id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    const urlEncodedData = body.toString();

    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/deletemovie.php',
      urlEncodedData,
      { headers }
    );
  }
  addInstruction(p_id: number, p_noStep: number, p_instruction: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('movie_id', p_id.toString());
    body.set('step', p_noStep.toString());
    body.set('instruction', p_instruction);
    const urlEncodedData = body.toString();

    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/add_instruction.php',
      urlEncodedData,
      { headers }
    );
  }

  checkLogin(email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    const urlEncodedData = body.toString();

    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/login_movies.php',
      urlEncodedData,
      { headers }
    );
  }

  register(full_name: string, email: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('nama', full_name);
    body.set('email', email);
    body.set('password', password);
    const urlEncodedData = body.toString();

    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/register_movies.php',
      urlEncodedData,
      { headers }
    );
  }
  addReview(movieId: string, userId: string, rating: string, text: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('movie_id', movieId.toString());
    body.set('user_id', userId.toString());
    body.set('rating', rating.toString());
    body.set('text', text);
    const urlEncodedData = body.toString();
    return this.http.post(
      'https://ubaya.xyz/hybrid/160422007/add_review.php',
      urlEncodedData,
      { headers }
    );
  }
  fetchDetailMovie(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new URLSearchParams();
    body.set('id', id);
    const urlEncodedData = body.toString();
    return this.http
      .post(
        'https://ubaya.xyz/hybrid/160422007/movies_detail.php',
        urlEncodedData,
        { headers }
      )
      .pipe(tap((response) => console.log('api response:', response)));
  }
}
