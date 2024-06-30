import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginFormModel, LoginResponseModel } from '../models';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly loginLabel = 'Login';
  readonly registerLabel = 'Register';

  public isLoading: boolean = false;
  public title = this.loginLabel;
  public loginForm: FormGroup<LoginFormModel>;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group<LoginFormModel>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public changeView() {
    this.title =
      this.title === this.loginLabel ? this.registerLabel : this.loginLabel;
  }

  public login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.loginService.login(credentials).subscribe({
        next: (response) => {
          const token = response.accessToken;
          localStorage.setItem('authToken', token);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.log('Error logging in: ', error);
        },
      });
    }
  }
}
