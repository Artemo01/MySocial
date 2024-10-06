import { Component, Input } from '@angular/core';
import { PostModel } from '../shated-models';

@Component({
  selector: 'social-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: PostModel;
}
