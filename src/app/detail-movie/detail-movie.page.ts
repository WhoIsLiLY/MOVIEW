import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, movies } from '../main/movies-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.page.html',
  styleUrls: ['./detail-movie.page.scss'],
  standalone: false
})
export class DetailMoviePage implements OnInit {
  movies: Movie[] = movies;
  movie: Movie = {
    id: 0,
    title: '',
    poster: '',
    genre: '',
    releaseDate: '',
    averageRating: null,
    director: '',
    casting: [],
    synopsis: '',
    trailer_url: ''
  };
  id: number = 0;
  reviews: any[] = [];
  newReview = { rating: null, text: '' };
  currentUser = { username: 'John Doe', isLoggedIn: true };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    this.route.params.subscribe(params => {
      const movieId = params['id']; // Get the movie ID from the URL
      this.fetchMovieDetails(movieId);
      this.fetchReviews(movieId);
    });
  }
  isReleased(releaseDate: string): boolean {
    return new Date(releaseDate) <= new Date();
  }
  fetchMovieDetails(movieId: number) {
    this.movie = movies.find(movie => movie.id == this.id) || this.movie;
  }

  fetchReviews(movieId: number) {
    // Fetch reviews for the movie (simulate API call)
    this.reviews = [
      {
        username: 'JaneDoe',
        date: new Date(),
        rating: 5,
        text: 'Great movie! Highly recommend it.',
      },
      {
        username: 'JohnSmith',
        date: new Date(),
        rating: 4,
        text: 'Good movie, but could be better.',
      },
    ];
  }

  submitReview() {
    if (this.newReview.rating && this.newReview.text) {
      const review = {
        username: this.currentUser.username,
        date: new Date(),
        rating: this.newReview.rating,
        text: this.newReview.text,
      };
      this.reviews.unshift(review); // Add new review to the top
      this.newReview = { rating: null, text: '' }; // Reset form
      this.showToast('Review submitted successfully', 'success');
    } else {
      this.showToast('Please provide both rating and review text', 'warning');
    }
  }

  isLoggedIn() {
    return this.currentUser.isLoggedIn; // Return true if user is logged in
  }
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
