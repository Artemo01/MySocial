import { Component, inject } from '@angular/core';
import { AddPostService } from './add-post.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
@UntilDestroy()
export class AddPostComponent {
  public postContentControl = new FormControl('', [Validators.required]);

  private snackBar = inject(MatSnackBar);

  constructor(private addPostService: AddPostService) {}

  public addPost(): void {
    this.postContentControl.markAsTouched();
    if (this.postContentControl.value && this.postContentControl.valid) {
      this.addPostService
        .addPost(this.postContentControl.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => this.displaySnackBar('Post added successfully'),
          error: () => this.displaySnackBar('Error'),
          complete: () => this.resetPostForm(),
        });
    }
  }

  private displaySnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  private resetPostForm(): void {
    this.postContentControl.setValue(null);
    this.postContentControl.markAsUntouched();
  }
}
