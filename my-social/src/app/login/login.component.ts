import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginFormModel } from '../models';
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
  public isFormInvalid: boolean = false;
  public title = this.loginLabel;
  public loginForm: FormGroup<LoginFormModel>;
  public errorMessage: string = '';

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
      this.isFormInvalid = false;
      this.isLoading = true;
      const credentials = this.loginForm.value;

      this.loginService.login(credentials).subscribe({
        next: (response) => {
          this.isLoading = false;
          const token = response.accessToken;
          localStorage.setItem('authToken', token);
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Error logging in: ', error);
        },
      });
    } else {
      this.isFormInvalid = true;
    }
  }
}
