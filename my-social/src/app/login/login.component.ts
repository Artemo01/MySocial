import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly login = 'Login';
  readonly register = 'Register';

  public title = this.login;

  public changeView() {
    this.title = this.title === this.login ? this.register : this.login;
  }
}
