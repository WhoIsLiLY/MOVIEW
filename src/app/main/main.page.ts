import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();

interface Movie {
  title: string;
  poster: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false
})
export class MainPage implements OnInit {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  isDesktop: boolean = window.innerWidth > 768;
  movies: Movie[] = [
    { title: 'Aquaman and The Lost Kingdom', poster: 'assets/movies/mobile/p1.jpg' },
    { title: 'Wonka', poster: 'assets/movies/mobile/p2.jpg' },
    { title: 'The Beekeeper', poster: 'assets/movies/mobile/p3.jpg' },
    { title: 'Spiderman: Across the Spider Verse', poster: 'assets/movies/mobile/p4.jpg' },
    { title: 'Transformer: Rise of the Beast', poster: 'assets/movies/mobile/p5.jpg' },
    { title: 'Night Swim', poster: 'assets/movies/mobile/p6.jpg' },
    { title: 'The Book of Clarence', poster: 'assets/movies/mobile/p7.jpg' },
    { title: 'Ne Zha 2', poster: 'assets/movies/mobile/p8.jpg' },
    { title: 'Ed Westwick Darkgame', poster: 'assets/movies/mobile/p9.jpg' },
    { title: 'Wanted Man', poster: 'assets/movies/mobile/p10.jpg' },
  ];

  constructor() { }

  ngOnInit() {
    // Add index property to each movie for tracking
    this.movies = this.movies.map((movie, index) => ({
      ...movie,
      index
    }));
    this.updateDeviceType();
    window.addEventListener('resize', this.updateDeviceType);
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

        // Handle issue with the last slide click
        swiperInstance.on('slideChangeTransitionEnd', () => {
          if (swiperInstance.isEnd) {
            swiperInstance.loopFix();
            swiperInstance.update();
          }
        });
      }
    }, 2000);
  }
}