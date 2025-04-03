import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


const authLogin: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token'); // Misalnya ada token berarti login

  if (!isLoggedIn) {
    router.navigate(['/login']); // Redirect ke halaman login
    return false;
  }

  return true;
};

const authRole: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('role'); // Ambil role dari localStorage

  // Ambil role yang diperbolehkan dari data route (misalnya: data.requiredRole)
  const requiredRole = route.data?.['requiredRole'];

  if (!userRole || userRole !== requiredRole) {
    router.navigate(['/forbidden']); // Redirect ke halaman tidak punya akses
    return false;
  }

  return true;
};

export {authLogin, authRole}