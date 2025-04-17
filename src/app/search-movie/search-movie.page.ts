import { Component, OnInit } from '@angular/core';
import { movies,Movie } from '../main/movies-data';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
  standalone: false
})
export class SearchMoviePage implements OnInit {
  filter : string = "title";
  query : string = "";
  movies: Movie[] = [];
  queriedMovie : Movie[] = [];
  constructor(private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.movies = movies;
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query') ?? "";
      this.filter = params.get('filter') ?? "";
    });
    this.search();
  }

  search(){
    this.router.navigate(['/search-movie', this.query, this.filter]);

    if(this.filter === "title"){
      this.queriedMovie = this.movies.filter(movie => movie.title.toLowerCase().includes(this.query.toLowerCase())
    );
    }
    else if(this.filter === "genre"){
      this.queriedMovie = this.movies.filter(movie => movie.genre.toLowerCase().includes(this.query.toLowerCase()));
    }
    else if(this.filter === "actor"){
      this.queriedMovie = this.movies.filter(movie => movie.casting.some(cast => cast.actor.toLowerCase().includes(this.query.toLowerCase())));
    }
    else{
      this.queriedMovie = this.movies
    }
  }

  detailMovie(id: number) {
    this.router.navigate(['/detail-movie', id]);
  }
}
