import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  public logout(): void {
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('Token');
    return !!token;
  }

  public getToken(): string | null {
    return localStorage.getItem('Token');
  }
}
