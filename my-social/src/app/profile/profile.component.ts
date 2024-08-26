import { Component } from '@angular/core';
import { UserDetails } from '../login/login-models';
import { ProfileService } from './profile.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorService } from '../shared/error-modal/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@UntilDestroy()
export class ProfileComponent {
  public userDetails!: UserDetails;
  public isLoading = true;

  constructor(
    private profileService: ProfileService,
    private errorService: ErrorService
  ) {
    this.getCurrentUserDetails();
  }

  private getCurrentUserDetails() {
    this.isLoading = true;
    const user = this.profileService.getCurrentUserRequest();
    user.pipe(untilDestroyed(this)).subscribe({
      next: (details) => {
        this.userDetails = details;
        this.isLoading = false;
      },
      error: (error) => {
        this.showModalError(error.message);
        this.isLoading = false;
      },
    });
  }

  private showModalError(message: string): void {
    this.errorService.showError(message);
  }
}
