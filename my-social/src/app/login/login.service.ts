import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthResponse, LoginRequest } from './login-models';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}Auth/login`, data);
  }
}
