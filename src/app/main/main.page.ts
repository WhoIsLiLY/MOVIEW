import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false
})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {}

  movies = [
    { title: 'Aquaman and The Lost Kingdom', poster: 'assets/movies/mobile/p1.jpg' },
    { title: 'Wonka', poster: 'assets/movies/mobile/p2.jpg' },
    { title: 'The Beekeeper', poster: 'assets/movies/mobile/p3.jpg' },
    { title: 'Spiderman: Across the Spider Verse', poster: 'assets/movies/mobile/p4.jpg' },
    { title: 'Transformer: Rise of the Beast', poster: 'assets/movies/mobile/p5.jpg' },
    { title: 'Night Swim', poster: 'assets/movies/mobile/p6.jpg' },
    { title: 'The Book of Clarence', poster: 'assets/movies/mobile/p7.jpg' },
    { title: 'The Painter', poster: 'assets/movies/mobile/p8.jpg' },
    { title: 'Ed Westwick Darkgame', poster: 'assets/movies/mobile/p9.jpg' },
    { title: 'Wanted Man', poster: 'assets/movies/mobile/p10.jpg' },
  ];
  ngAfterViewInit() {
    setTimeout(() => {
      const swiperEl = document.querySelector('swiper-container');
      if (swiperEl && swiperEl.swiper) {
        // Geser ke slide kedua
        swiperEl.swiper.slideTo(-1);
        // Kemudian langsung kembali ke slide pertama
        setTimeout(() => {
          swiperEl.swiper.slideTo(0, 300); // 300ms adalah durasi animasi
        }, 10);
      }
    }, 100); // Beri waktu untuk Swiper selesai diinisialisasi
  }
}
