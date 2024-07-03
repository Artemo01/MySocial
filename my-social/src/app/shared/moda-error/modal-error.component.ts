import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorService } from '../error.service';

@Component({
  selector: 'modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss'],
})
export class ModalErrorComponent implements OnInit, OnDestroy {
  public errorMessage: string = '';
  private errorSubscription: Subscription | null = null;

  constructor(private errorService: ErrorService) {}

  public ngOnInit(): void {
    this.errorSubscription = this.errorService
      .getError()
      .subscribe((message) => {
        this.errorMessage = message || '';
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
