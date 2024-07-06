import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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

  public passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasNumber = /[0-9]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isLengthValid = value.length >= 6;

      const passwordValid =
        hasNumber && hasUpperCase && hasSpecialCharacter && isLengthValid;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }
}
