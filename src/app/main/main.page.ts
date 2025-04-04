import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { Movie, movies } from './movies-data';
import { ToastController } from '@ionic/angular';

register();

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false
})
export class MainPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isDesktop: boolean = window.innerWidth > 768;
  currentIndex: number = 1;
  movies: Movie[] = movies;
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];

  constructor(private cdr: ChangeDetectorRef,  private toastController: ToastController) { }

  ngOnInit() {
    // Add index property to each movie for tracking
    this.movies = this.movies.map((movie, index) => ({
      ...movie,
      index
    }));
    this.updateDeviceType();
    window.addEventListener('resize', this.updateDeviceType);
    this.loadMovies();
    // console.log(this.topRatedMovies);
    // console.log(this.upcomingMovies);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    // Menghapus token dari localStorage untuk logout
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.showToast('Logout successful!', 'success');
  }

  loadMovies() {
    this.topRatedMovies = this.movies
      .filter(movie => (movie.averageRating || 0) >= 0)
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, 5)
      .map(movie => ({
        ...movie,
        poster: movie.poster.replace(/assets\/movies\/.*/, 'assets/movies/mobile/' + movie.poster.split('/').pop())
      }));

    this.upcomingMovies = this.movies
      .filter(movie => new Date(movie.releaseDate) > new Date())
      .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
      .slice(0, 5)
      .map(movie => ({
        ...movie,
        poster: movie.poster.replace(/assets\/movies\/.*/, 'assets/movies/mobile/' + movie.poster.split('/').pop())
      }));
}


  isReleased(releaseDate: string): boolean {
    return new Date(releaseDate) <= new Date();
  }

  getMovieMessage(): string {
    const movie = this.movies?.[this.currentIndex]; // Cek apakah movies tersedia

    if (!movie || movie.averageRating == null) { // Cek jika rating tidak ada
      return 'Film ini bentar lagi tayang lho! Ayo pre-order sekarang!';
    }

    if (movie.averageRating >= 9) {
      return `Film ini dapat rating ⭐ ${movie.averageRating} dari penonton lho! Wajib ditonton!`;
    } else if (movie.averageRating >= 6) {
      return `Film ini punya rating ⭐ ${movie.averageRating} nih. Masih seru buat ditonton!`;
    } else if (movie.averageRating > 0) {
      return `Ratingnya ⭐ ${movie.averageRating}. Tapi siapa tahu kamu tetap suka!`;
    } else {
      return 'Belum ada yang rate movie ini nih, yuk jadi yang pertama untuk rate!';
    }
  }

  updateDeviceType = () => {
    this.isDesktop = window.innerWidth > 768;
    this.movies = this.movies.map(movie => ({
      ...movie,
      poster: this.isDesktop
        ? movie.poster.replace('/mobile/', '/desktop/')
        : movie.poster.replace('/desktop/', '/mobile/')
    }));
  }

  slideToIndex(index: number) {
    if (this.swiperRef?.nativeElement) {
      const swiperInstance = this.swiperRef.nativeElement.swiper;
      swiperInstance.slideToLoop(index);
      swiperInstance.update();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.swiperRef?.nativeElement) {
        const swiperInstance = this.swiperRef.nativeElement.swiper;
        swiperInstance.on('slideChange', () => {
          this.updateCurrentIndex();
        });
        swiperInstance.on('slideChangeTransitionEnd', () => {
          if (swiperInstance.isEnd) {
            swiperInstance.loopFix();
            swiperInstance.update();
          }
        });
      }
    }, 2000);
  }
  updateCurrentIndex() {
    if (this.swiperRef?.nativeElement) {
      const activeSlide = this.swiperRef.nativeElement.querySelector('.swiper-slide-active');

      if (activeSlide) {
        const index = activeSlide.getAttribute('data-swiper-slide-index');
        if (index !== null) {
          this.currentIndex = parseInt(index, 10);
          this.cdr.detectChanges(); // Paksa update UI agar movie-title berubah
        }
      }
    }
  }
}