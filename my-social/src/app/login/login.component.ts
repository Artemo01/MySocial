import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthModel, LoginFormModel, RegisterFormModel } from '../models';
import { LoginService } from './login.service';
import { ErrorService } from '../shared/error.service';

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
  public registerForm: FormGroup<RegisterFormModel>;
  public errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private errorService: ErrorService
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

    this.registerForm = this.formBuilder.group<RegisterFormModel>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public changeView() {
    this.title =
      this.title === this.loginLabel ? this.registerLabel : this.loginLabel;

    this.isFormInvalid = false;
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
          this.errorService.setError(error);
        },
      });
    } else {
      this.isFormInvalid = true;
    }
  }

  public register() {
    const isConfirmPassword =
      this.registerForm.controls.password.value ===
      this.registerForm.controls.confirmPassword.value;

    if (this.registerForm.valid && isConfirmPassword) {
      this.isFormInvalid = false;
      this.isLoading = true;

      const credentials: AuthModel = {
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
      };

      this.loginService.register(credentials).subscribe({
        next: () => {
          this.loginForm.setValue({
            email: this.registerForm.controls.email.value,
            password: this.registerForm.controls.password.value,
          });
          this.login();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorService.setError(error);
        },
      });
    } else {
      this.isFormInvalid = true;
    }
  }
}
