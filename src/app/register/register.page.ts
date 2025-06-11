import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  ngOnDestroy() {
    this.resetForm();
  }

  resetForm() {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.showToast('Password do not match!', 'warning');
      return;
    }

    const user = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.movieService
      .register(this.fullName, this.email, this.password)
      .subscribe(
        (data) => {
          if ((data as any).result === 'success') {
            this.showToast('Registration success!', 'success');
            this.router.navigate(['/login']);
          } else {
            this.showToast('Registration failed', 'danger');
          }
        },
      );
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  goToLogin() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
