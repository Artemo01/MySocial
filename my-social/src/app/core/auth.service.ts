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
    return !!token && !this.isTokenExpired(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('Token');
  }

  private isTokenExpired(token: string): boolean {
    const expiry = this.getTokenExpiry(token);
    if (expiry) {
      return Date.now() > expiry;
    }
    return false;
  }

  private getTokenExpiry(token: string): number | null {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp ? payload.exp * 1000 : null;
  }
}
