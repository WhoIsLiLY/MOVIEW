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
      this.movieService.movieList("").subscribe(
      (data) => {
        this.movies = data;
        console.log(this.movies);
        this.movies = this.movies.map((movie, index) => ({
          ...movie,
          index
        }));
      }
    ); 
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }


  editMovie(id: number) {
    this.router.navigate(['/edit-movie', id]);
  }

  deleteMovie(id: number) {
    const confirmDelete = confirm('Yakin ingin menghapus movie ini?');
    if (confirmDelete) {
      this.movieService.deletemovie(id).subscribe(
         (data) => {
          if ((data as any).result === 'success') {
             this.showToast('Movie deleted!', 'success');
          } else {
             this.showToast('Failed to delete movie!', 'success');
          }
        },
      )
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
