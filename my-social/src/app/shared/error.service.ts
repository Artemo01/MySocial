import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<HttpErrorResponse | null>(null);

  public getError(): Observable<HttpErrorResponse | null> {
    return this.errorSubject.asObservable();
  }

  public setError(message: HttpErrorResponse) {
    this.errorSubject.next(message);
  }

  public clearError() {
    this.errorSubject.next(null);
  }
}
