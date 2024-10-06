import { Component } from '@angular/core';
import { AddPostService } from './add-post.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
@UntilDestroy()
export class AddPostComponent {
  public postContentControl = new FormControl('', [Validators.required]);

  constructor(private addPostService: AddPostService) {}

  public addPost(): void {
    this.postContentControl.markAsTouched();
    if (this.postContentControl.value && this.postContentControl.valid) {
      this.addPostService
        .addPost(this.postContentControl.value)
        .pipe(untilDestroyed(this))
        .subscribe(() => this.postAddedSuccessfully());
    }
  }

  private postAddedSuccessfully(): void {
    this.postContentControl.setValue(null);
    this.postContentControl.markAsUntouched();
  }
}
