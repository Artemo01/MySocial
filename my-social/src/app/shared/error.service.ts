import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);

  public getError(): Observable<string | null> {
    return this.errorSubject.asObservable();
  }

  public setError(message: string) {
    this.errorSubject.next(message);
  }

  public clearError() {
    this.errorSubject.next(null);
  }
}
