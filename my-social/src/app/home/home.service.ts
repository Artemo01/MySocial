import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';
import { PostModel } from '../shared/shated-models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private apiService: ApiService) {}

  public getPosts(): Observable<PostModel[]> {
    const url = 'Posts';
    return this.apiService.get<PostModel[]>(url);
  }
}
