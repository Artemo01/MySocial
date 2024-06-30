import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'https://localhost:44371';

  constructor(private http: HttpClient) {}

  login(credentials: Partial<LoginModel>): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      `${this.apiUrl}/login`,
      credentials
    );
  }
}
