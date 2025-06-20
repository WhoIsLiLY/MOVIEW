import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MovieService, Movie } from '../movie.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: false
})
export class DetailMoviePage implements OnInit {
  movies: Movie[] = [];
  movie: Movie = {
    id: 0,
    title: '',
    poster: '',
    genre: '',
    release_date: '',
    average_rating: null,
    director: '',
    casting: [],
    synopsis: '',
    trailer_url: ''
  };
  id: number = 0;
  reviews: any[] = [];
  newReview = { rating: '', text: '' };
  isDesktop: boolean = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    this.route.params.subscribe(params => {
      const movieId = params['id']; // Get the movie ID from the URL
      this.fetchMovieDetails(movieId);
    });

    this.checkScreen();
  }
  isReleased(releaseDate: string): boolean {
    return new Date(releaseDate) <= new Date();
  }
  fetchMovieDetails(movieId: number) {
    this.movieService.fetchDetailMovie(movieId.toString()).subscribe(
      (data: any) => {
        if (data['result'] == "success") {
          this.showToast('fetch success!', 'success');
          this.movie = data['data'];
          this.movie['casting'] = data['casting'];
          this.reviews = data['reviews'];
          console.log(this.movie);
          console.log(this.reviews);
        }
        else {
          this.showToast('fail', 'warning');
        }
      }
    );
  }

  submitReview() {
    const userId = localStorage.getItem('token') as string;
    this.movieService.addReview(this.movie["id"].toString(), userId, this.newReview.rating, this.newReview.text).subscribe(
      (data: any) => {
        if (data['result'] == "success") {
          this.showToast('Review submitted successfully', 'success');
        }
        else {
          this.showToast('Please provide both rating and review text', 'warning');
        }
      }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('token'); // Return true if user is logged in
  }
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreen();
  }

  checkScreen() {
    this.isDesktop = window.innerWidth >= 854;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
