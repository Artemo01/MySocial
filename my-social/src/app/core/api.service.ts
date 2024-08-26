import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}${endpoint}`, {
        params,
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  public post<T>(
    endpoint: string,
    body: any,
    params?: HttpParams
  ): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}${endpoint}`, body, {
        params,
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => error);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
