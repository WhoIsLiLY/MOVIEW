import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authLogin, authRole } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'manage-movie',
    loadChildren: () => import('./manage-movie/manage-movie.module').then( m => m.ManageMoviePageModule),
    canActivate: [authLogin]
  },
  {
    path: 'add-movie',
    loadChildren: () => import('./add-movie/add-movie.module').then( m => m.AddMoviePageModule),
    canActivate: [authLogin]
  },
  {
    path: 'edit-movie/:id',
    loadChildren: () => import('./edit-movie/edit-movie.module').then(m => m.EditMoviePageModule),
    canActivate: [authLogin]
  },
  {
    path: 'search-movie',
    loadChildren: () => import('./search-movie/search-movie.module').then( m => m.SearchMoviePageModule),
    canActivate: [authLogin]
  },
  {
    path: 'search-movie/:query/:filter',
    loadChildren: () => import('./search-movie/search-movie.module').then( m => m.SearchMoviePageModule),
    canActivate: [authLogin]
  },
  {
    path: 'detail-movie/:id',
    loadChildren: () => import('./detail-movie/detail-movie.module').then( m => m.DetailMoviePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
