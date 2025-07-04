import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { movies, Movie } from '../main/movies-data';
import { MovieService } from '../movie.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
  standalone: false,
})
export class EditMoviePage implements OnInit {
  movieId: number = 0;
  movie?: Movie;
  posterPreviewDesktop: string | ArrayBuffer | null = null;
  posterPreviewMobile: string | ArrayBuffer | null = null;
  movieForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private toastController: ToastController,
    private fb: FormBuilder
  ) {}

  private posterFileDesktop: File | null = null;
  private posterFileMobile: File | null = null;

  ngOnInit() {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      releaseDate: ['', Validators.required],
      averageRating: ['', [Validators.min(0), Validators.max(10)]],
      director: [''],
      synopsis: [''],
      poster: [''],
      trailer: [''],
      casting: this.fb.array([]),
    });

    this.movieId = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.movieDetail(this.movieId).subscribe((data) => {
      this.movie = {
        ...data['data'],
        releaseDate: data['data'].release_date,
        averageRating: data['data'].average_rating,
      };
      const castingData = data['casting'] || [];
      const trailer = this.movie?.trailer_url || '';

      // Set field biasa
      this.movieForm.patchValue({
        title: this.movie?.title,
        genre: this.movie?.genre,
        releaseDate: this.movie?.releaseDate,
        averageRating: this.movie?.averageRating,
        director: this.movie?.director,
        synopsis: this.movie?.synopsis,
        poster: this.movie?.poster,
        trailer: this.movie?.trailer_url,
      });

      // Isi casting
      const castingArray = this.movieForm.get('casting') as FormArray;
      castingData.forEach((cast: any) => {
        castingArray.push(
          this.fb.group({
            actor_name: [cast.actor, Validators.required],
            role: [cast.role, Validators.required],
            image: [cast.image || ''],
          })
        );
      });

      if (castingArray.length === 0) {
        castingArray.push(this.createCasting());
      }
    });
  }

  triggerFileInput(type: 'desktop' | 'mobile') {
    const inputElement =
      type === 'desktop'
        ? (document.getElementById('desktopInput') as HTMLInputElement)
        : (document.getElementById('mobileInput') as HTMLInputElement);

    inputElement?.click();
  }

  get casting(): FormArray {
    return this.movieForm.get('casting') as FormArray;
  }

  createCasting(): FormGroup {
    return this.fb.group({
      actor_name: ['', Validators.required],
      role: ['', Validators.required],
      image: [''],
    });
  }

  addCasting() {
    this.casting.push(this.createCasting());
  }

  removeCasting(index: number) {
    this.casting.removeAt(index);
  }

  getFileName(path: string): string {
    return path.split('/').pop() || '';
  }

  getPosterPath(poster: string | undefined): string {
    if (!poster) return '';
    return 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

    // Cek apakah string poster adalah base64
    // if (poster.startsWith('data:image')) {
    //   return poster;
    // }

    // // Jika bukan base64, gunakan path lokal desktop
    // return 'assets/movies/desktop/' + this.getFileName(poster);
  }

  // Handle image selection for desktop
  onDesktopImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.posterFileDesktop = file;
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
      this.posterFileMobile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.posterPreviewMobile = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveMovie() {
    if (this.movieForm.invalid || !this.movie) {
      alert('Form tidak valid atau data film belum dimuat.');
      return;
    }

    const formValue = this.movieForm.value;

    const actor: string[] = [];
    const role: string[] = [];
    const image: string[] = [];

    this.casting.controls.forEach((group: any) => {
      actor.push(group.get('actor_name')?.value);
      role.push(group.get('role')?.value);
      image.push(group.get('image')?.value || '');
    });

    const poster =
      this.posterPreviewDesktop || formValue.poster || this.movie.poster;
    const trailer = formValue.trailer;

    const formData = new FormData();
    formData.append('title', formValue.title);
    formData.append('genre', formValue.genre);
    formData.append('poster', '');
    formData.append('release_date', formValue.releaseDate);
    formData.append('average_rating', formValue.averageRating.toString());
    formData.append('director', formValue.director);
    formData.append('synopsis', formValue.synopsis);
    formData.append('trailer', trailer);

    if (this.posterFileDesktop) {
      formData.append('poster_desktop', this.posterFileDesktop);
    }
    if (this.posterFileMobile) {
      formData.append('poster_mobile', this.posterFileMobile);
    }

    this.casting.controls.forEach((group: any) => {
      formData.append('actor[]', group.value.actor_name);
      formData.append('role[]', group.value.role);
      formData.append('image[]', group.value.image);
    });

    this.movieService.updatemovieForm(formData).subscribe((data) => {
      this.showToast('Movie has been updated', 'success');
      this.router.navigate(['/manage-movie']);
    });

    this.movieService
      .updatemovie(
        this.movieId,
        formValue.title,
        formValue.genre,
        poster,
        formValue.releaseDate,
        formValue.director,
        formValue.synopsis,
        formValue.averageRating,
        actor,
        role,
        image,
        trailer
      )
      .subscribe((res: any) => {
        console.log('Response dari editmovie.php:', res);

        if (res.result === 'success') {
          alert('Movie updated successfully!');
          this.router.navigate(['/manage-movie']);
        } else {
          alert('Gagal update movie: ' + res.message);
        }
      });
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
