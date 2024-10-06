import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [ErrorModalComponent, AddPostComponent, PostComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [ErrorModalComponent, AddPostComponent, PostComponent],
})
export class SharedModule {}
