import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';
import { PostModel } from '../shated-models';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  constructor(private apiService: ApiService) {}

  public addPost(content: string): Observable<PostModel> {
    const url = 'Posts';
    const body = { content };
    return this.apiService.post<PostModel>(url, body);
  }
}
