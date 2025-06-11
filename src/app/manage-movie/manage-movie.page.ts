import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { movies, Movie } from '../main/movies-data';
import { Router } from '@angular/router';
import  {MovieService} from '../movie.service'

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.page.html',
  styleUrls: ['./manage-movie.page.scss'],
  standalone: false
})
export class ManageMoviePage implements OnInit {
  movies: Movie[] = [];

  constructor(private router: Router, private toastController: ToastController, private movieService : MovieService) {}

  ngOnInit() {
    this.movies = movies; 
  }

  editMovie(id: number) {
    this.router.navigate(['/edit-movie', id]);
  }

  deleteMovie(id: number) {
    const confirmDelete = confirm('Yakin ingin menghapus movie ini?');
    if (confirmDelete) {
      this.movies = this.movies.filter(movie => movie.id !== id);
    }
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }, 100); // delay agar tidak diblock oleh guard
    });
  }
  
}
