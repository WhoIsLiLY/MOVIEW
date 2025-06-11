import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private toastController: ToastController, private movieService: MovieService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    this.email = '';
    this.password = '';
  }

  ngOnDestroy() {
    this.email = '';
    this.password = '';
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast('Please enter both email and password', 'warning');
      return;
    } else {
      this.movieService.checkLogin(this.email, this.password).subscribe(
        (data: any) => {
          if (data['result'] == "success") {
            if (data['role'] == "admin") {
              localStorage.setItem('token', 'your-jwt-token');
              localStorage.setItem('role', 'admin');
              this.showToast('Login successful!', 'success');
              this.router.navigate(['/manage-movie']);
            } else {
              localStorage.setItem('token', 'your-jwt-token');
              localStorage.setItem('role', 'user');
              this.showToast('Login successful!', 'success');
              this.router.navigate(['/']);
            }
          }
          else {
            this.showToast('Invalid email or password', 'danger');
          }
        }
      );

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

  goToRegister() {
    this.router.navigate(['/register'], { replaceUrl: true });
  }
}
