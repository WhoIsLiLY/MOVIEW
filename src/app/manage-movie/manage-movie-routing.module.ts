import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageMoviePage } from './manage-movie.page';

const routes: Routes = [
  {
    path: '',
    component: ManageMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageMoviePageRoutingModule {}
