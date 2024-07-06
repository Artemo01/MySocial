import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthModel, LoginResponseModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'https://localhost:44371';

  constructor(private http: HttpClient) {}

  public login(
    credentials: Partial<AuthModel>
  ): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  public register(credentials: Partial<AuthModel>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
  }
}
