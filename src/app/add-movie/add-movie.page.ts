import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('posterInput') posterInputRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      averageRating: ['', [Validators.min(0), Validators.max(10)]],
      director: [''],
      casting: [''],
      synopsis: [''],
      poster: ['']
    });
  }

  posterPreviewDesktop: string | null = null;
  posterPreviewMobile: string | null = null;
  
  triggerFileInput(type: 'desktop' | 'mobile') {
    const inputElement = type === 'desktop'
      ? document.getElementById('desktopInput') as HTMLInputElement
      : document.getElementById('mobileInput') as HTMLInputElement;
  
    inputElement?.click();
  }
  
  onDesktopImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreviewDesktop = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  onMobileImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreviewMobile = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }

  async addMovie() {
    if (this.movieForm.invalid) return;
  
    // Ambil gambar dari desktop atau mobile (prioritaskan desktop jika ada)
    const selectedPoster = this.posterPreviewDesktop || this.posterPreviewMobile;
  
    const newMovie: Movie = {
      id: Date.now(),
      ...this.movieForm.value,
      poster: selectedPoster, // <-- simpan poster di sini
      casting: this.movieForm.value.casting
        ? this.movieForm.value.casting.split(',').map((actor: string) => actor.trim())
        : []
    };
  
    movies.push(newMovie);
    await this.showToast('Movie has been added', 'success');
    await this.router.navigate(['/manage-movie']);
  }
  
}
