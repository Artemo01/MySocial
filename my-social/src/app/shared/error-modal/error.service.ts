import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private dialog: MatDialog) {}

  public showError(message: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: { message },
    });
  }
}
