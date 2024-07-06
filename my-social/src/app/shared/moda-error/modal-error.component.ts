import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorService } from '../error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent implements OnInit, OnDestroy {
  public errorMessage: HttpErrorResponse | undefined;
  private errorSubscription: Subscription | null = null;

  constructor(private errorService: ErrorService) {}

  public ngOnInit(): void {
    this.errorSubscription = this.errorService.getError().subscribe((error) => {
      this.errorMessage = error || undefined;
    });
  }
  public ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  public closeModal() {
    this.errorService.clearError();
  }
}
