import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { movies, Movie } from '../main/movies-data';
import { ToastController } from '@ionic/angular';
import { MovieService } from '../movie.service';
import { race } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
  standalone: false,
})
export class AddMoviePage implements OnInit {
  movieForm!: FormGroup;
  posterPreview: string | ArrayBuffer | null = null;

  @ViewChild('posterInput') posterInputRef!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      averageRating: ['', [Validators.min(0), Validators.max(10)]],
      director: [''],
      casting: this.fb.array([this.createCasting()]),
      synopsis: [''],
      poster: [''],
      trailer: [''],
    });
  }

  private posterFileDesktop: File | null = null;
  private posterFileMobile: File | null = null;

  get casting(): FormArray {
    return this.movieForm.get('casting') as FormArray;
  }

  createCasting(): FormGroup {
    return this.fb.group({
      actor_name: ['', Validators.required],
      role: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  addCasting() {
    this.casting.push(this.createCasting());
  }

  removeCasting(index: number) {
    this.casting.removeAt(index);
  }

  posterPreviewDesktop: string | null = null;
  posterPreviewMobile: string | null = null;

  triggerFileInput(type: 'desktop' | 'mobile') {
    const inputElement =
      type === 'desktop'
        ? (document.getElementById('desktopInput') as HTMLInputElement)
        : (document.getElementById('mobileInput') as HTMLInputElement);

    inputElement?.click();
  }

  onDesktopImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.posterFileDesktop = file;
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
      this.posterFileMobile = file;
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
      color,
    });
    await toast.present();
  }

  async addMovie() {
    if (this.movieForm.invalid) return;

    await this.showToast('pressed', 'ok');
    const {
      title,
      genre,
      releaseDate,
      averageRating,
      director,
      synopsis,
      trailer,
    } = this.movieForm.value;

    const castings = this.movieForm.value.casting; // this is an array of {actor, role}

    const actors = castings.map((c: { actor: any }) => c.actor);
    const roles = castings.map((c: { role: any }) => c.role);
    const images = castings.map((c: { image: any }) => c.image);

    // Ambil gambar dari desktop atau mobile (prioritaskan desktop jika ada)
    const selectedPoster =
      this.posterPreviewDesktop || this.posterPreviewMobile;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('genre', genre);
    formData.append('poster', '');
    formData.append('release_date', releaseDate);
    formData.append('average_rating', averageRating.toString());
    formData.append('director', director);
    formData.append('synopsis', synopsis);
    formData.append('trailer', trailer);

    if (this.posterFileDesktop) {
      formData.append('poster_desktop', this.posterFileDesktop);
    }
    if (this.posterFileMobile) {
      formData.append('poster_mobile', this.posterFileMobile);
    }

    castings.forEach((c: any, index: number) => {
      formData.append(`actor[]`, c.actor_name);
      formData.append(`role[]`, c.role);
      formData.append(`image[]`, c.image); // If image is file, use File, not base64 string
    });

    this.movieService.addmovieForm(formData).subscribe((data) => {
      this.showToast('Movie has been added', 'success');
      this.router.navigate(['/manage-movie']);
    });

    // this.movieService
    //   .addmovie(
    //     title,
    //     genre,
    //     '',
    //     releaseDate,
    //     director,
    //     synopsis,
    //     averageRating,
    //     actors,
    //     roles,
    //     images,
    //     trailer
    //   )
    //   .subscribe((data) => {
    //     this.showToast('Movie has been added', 'success');
    //     this.router.navigate(['/manage-movie']);
    //   });
  }
}
