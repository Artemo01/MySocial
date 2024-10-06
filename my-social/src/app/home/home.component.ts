import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { PostModel } from '../shared/shated-models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
@UntilDestroy()
export class HomeComponent implements OnInit {
  public posts: PostModel[] = [];

  constructor(private homeService: HomeService) {}

  public ngOnInit(): void {
    this.homeService
      .getPosts()
      .pipe(untilDestroyed(this))
      .subscribe((posts) => (this.posts = posts));
  }
}
