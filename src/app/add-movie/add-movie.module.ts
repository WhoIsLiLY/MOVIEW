import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMoviePageRoutingModule } from './add-movie-routing.module';

import { AddMoviePage } from './add-movie.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddMoviePageRoutingModule
  ],
  declarations: [AddMoviePage]
})
export class AddMoviePageModule {}
