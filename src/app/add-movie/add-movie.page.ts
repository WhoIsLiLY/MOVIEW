import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { movies, Movie } from '../main/movies-data';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
  standalone: false
})

export class AddMoviePage implements OnInit {
  movieForm!: FormGroup;
  posterPreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      averageRating: [''],
      director: [''],
      casting: [''],
      synopsis: [''],
      poster: ['']
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreview = reader.result;
        this.movieForm.patchValue({ poster: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  addMovie() {
    if (this.movieForm.invalid) return;

    const newMovie: Movie = {
      id: Date.now(), // ID unik
      ...this.movieForm.value,
      casting: this.movieForm.value.casting
        ? this.movieForm.value.casting.split(',').map((actor: string) => actor.trim())
        : []
    };

    movies.push(newMovie);
    this.showToast('Movie has been added', 'success');
    this.router.navigate(['/manage-movie']);
  }
}