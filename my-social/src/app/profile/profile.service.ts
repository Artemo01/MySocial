import { Injectable } from '@angular/core';
import { UserDetails } from '../login/login-models';
import { Observable } from 'rxjs';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: ApiService) {}

  public getCurrentUserRequest(): Observable<UserDetails> {
    const url = 'Users/currentUser';
    return this.apiService.get<UserDetails>(url);
  }
}
