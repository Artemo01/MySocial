import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public title = 'Profile';
  public userData: any;

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http.get<any>('https://localhost:44371/users').subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (error) => {
        console.log('Error fetching user data:', error);
      },
    });
  }
}
