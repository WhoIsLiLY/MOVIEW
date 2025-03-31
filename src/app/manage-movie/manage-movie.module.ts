import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageMoviePageRoutingModule } from './manage-movie-routing.module';

import { ManageMoviePage } from './manage-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageMoviePageRoutingModule
  ],
  declarations: [ManageMoviePage]
})
export class ManageMoviePageModule {}
