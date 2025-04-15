import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movies, Movie } from '../main/movies-data';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
  standalone: false
})
export class EditMoviePage implements OnInit {
  movieId: number = 0;
  movie?: Movie;
  posterPreview: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = movies.find(m => m.id === this.movieId);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreview = reader.result;
        if (this.movie) {
          this.movie.poster = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveMovie() {
    // Simulasi penyimpanan
    alert('Movie updated successfully!');
    this.router.navigate(['/manage-movie']);
  }

}
