import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
import { Movie, movies } from './movies-data';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { MovieService } from '../movie.service';

register();

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false
})
export class MainPage implements OnInit {
  @ViewChild('swiper_desktop') swiperRefDesktop: ElementRef | undefined;
  @ViewChild('swiper_mobile') swiperRefMobile: ElementRef | undefined;
  @ViewChild('mainBackgroundDesktop', { static: false }) mainBackgroundDesktop!: ElementRef;
  @ViewChild('mobile_layout', { static: false }) mobile_layout!: ElementRef;
  @ViewChild('desktop_layout', { static: false }) desktop_layout!: ElementRef;
  isDesktop: boolean = window.innerWidth > 768;
  currentIndex: number = 2;
  movies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  filter: String = "title";
  query: string = "";

  constructor(private cdr: ChangeDetectorRef, private toastController: ToastController, private router: Router, private movieService: MovieService) { }

  nextSlide() {
    const swiperInstance = this.isDesktop
      ? this.swiperRefDesktop?.nativeElement?.swiper
      : this.swiperRefMobile?.nativeElement?.swiper;

    if (swiperInstance) {
      swiperInstance.slideNext();
    }
    this.updateDeviceType();
    console.log(this.currentIndex);
  }

  prevSlide() {
    const swiperInstance = this.isDesktop
      ? this.swiperRefDesktop?.nativeElement?.swiper
      : this.swiperRefMobile?.nativeElement?.swiper;

    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
    this.updateDeviceType();
    console.log(this.currentIndex);
  }

  ngOnInit() {
    this.movieService.movieList("").subscribe(
      (data) => {
        this.movies = data;
        console.log(this.movies);
        this.movies = this.movies.map((movie, index) => ({
          ...movie,
          index
        }));
        this.updateDeviceType();
        window.addEventListener('resize', this.updateDeviceType);
        this.loadMovies();
      }
    );


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
    if (this.isDesktop) {
      const dkEl = this.desktop_layout?.nativeElement;
      const mbEl = this.mobile_layout?.nativeElement;
      if (dkEl && mbEl) {
        dkEl.style.display = `block`;
        mbEl.style.display = 'none';
      }

    } else {
      const dkEl = this.desktop_layout?.nativeElement;
      const mbEl = this.mobile_layout?.nativeElement;
      if (dkEl && mbEl) {
        dkEl.style.display = 'none';
        mbEl.style.display = 'block';
      }
    }
    // console.log(this.isDesktop);
    // console.log(this.currentIndex);
    this.cdr.detectChanges();
    this.slideOnChange();
  }

  slideToIndex(index: number) {
    if (this.isDesktop) {
      const swiperInstanceDesktop = this.swiperRefDesktop?.nativeElement.swiper;
      swiperInstanceDesktop.slideToLoop(index);
      swiperInstanceDesktop.update();
    }
    if (!this.isDesktop) {
      const swiperInstanceMobile = this.swiperRefMobile?.nativeElement.swiper;
      swiperInstanceMobile.slideToLoop(index);
      swiperInstanceMobile.update();
    }
  }

  ngAfterViewInit() {
    this.updateDeviceType();
    this.loadMovies(); // Panggil load dulu
    this.slideOnChange();
  }

  slideOnChange() {
    setTimeout(() => {

      // console.log(this.isDesktop);
      const swiperInstance = this.isDesktop
        ? this.swiperRefDesktop?.nativeElement?.swiper
        : this.swiperRefMobile?.nativeElement?.swiper;

      if (swiperInstance) {
        swiperInstance.on('slideChange', () => {
          this.updateCurrentIndex();
          this.updateBackgroundImage();
        });

        swiperInstance.on('slideChangeTransitionEnd', () => {
          if (swiperInstance.isEnd) {
            swiperInstance.loopFix();
            swiperInstance.update();
          }
        });
      }
    }, 1000);
  }

  updateCurrentIndex() {
    let activeSlide: HTMLElement | null = null;

    if (this.isDesktop) {
      activeSlide = this.swiperRefDesktop?.nativeElement.querySelector('.swiper-slide-active');
    } else {
      activeSlide = this.swiperRefMobile?.nativeElement.querySelector('.swiper-slide-active');
    }

    if (activeSlide) {
      const index = activeSlide.getAttribute('data-swiper-slide-index');
      if (index !== null) {
        this.currentIndex = parseInt(index, 10);
        this.cdr.detectChanges();
      }
    }
    // console.log(activeSlide);
  }
  updateBackgroundImage() {
    const bgEl = this.mainBackgroundDesktop?.nativeElement;
    if (bgEl) {
      const newUrl = this.movies[this.currentIndex].poster;
      bgEl.style.backgroundImage = `
        linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%),
        url("${newUrl}")
      `;
    }
    this.cdr.detectChanges();
  }

  search(event: Event) {
    this.router.navigate(['/search-movie/', this.query, this.filter]);
  }
}