import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  posterPreviewDesktop: string | ArrayBuffer | null = null;
  posterPreviewMobile: string | ArrayBuffer | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie = movies.find(m => m.id === this.movieId);
  }

  getFileName(path: string): string {
    return path.split('/').pop() || '';
  }

  getPosterPath(poster: string | undefined): string {
    if (!poster) return '';
    
    // Cek apakah string poster adalah base64
    if (poster.startsWith('data:image')) {
      return poster;
    }
  
    // Jika bukan base64, gunakan path lokal desktop
    return 'assets/movies/desktop/' + this.getFileName(poster);
  }
  
  
  // Handle image selection for desktop
  onDesktopImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreviewDesktop = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Handle image selection for mobile
  onMobileImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreviewMobile = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveMovie() {
    // Logic to save the movie
    alert('Movie updated successfully!');
    this.router.navigate(['/manage-movie']);
  }
}
