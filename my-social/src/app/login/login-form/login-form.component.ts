import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ErrorService } from 'src/app/shared/error-modal/error.service';
import { AuthResponse } from '../login-models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
@UntilDestroy()
export class LoginFormComponent implements OnInit {
  public hide: boolean = true;
  public isLogging: boolean = false;
  public showAlert: boolean = false;
  public alertMessage: string = '';
  public passwordInputType: 'password' | 'text' = 'password';

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private errorService: ErrorService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {}

  public changePasswordVisibility(): void {
    this.hide = !this.hide;
    this.passwordInputType = this.hide ? 'password' : 'text';
  }

  public login(): void {
    this.showAlert = false;
    this.isLogging = true;
    this.loginService
      .login(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          this.isLogging = false;
          this.handleLoginResponse(response);
        },
        error: (error) => {
          this.isLogging = false;
          this.showModalError(error.message);
        },
      });
  }

  private showModalError(message: string): void {
    this.errorService.showError(message);
  }

  private handleLoginResponse(response: AuthResponse): void {
    response.isSuccess
      ? this.handleLoginSucces(response.token)
      : this.handleLoginError(response.message);
  }

  private handleLoginSucces(token: string): void {
    if (token != null && token.length !== 0) {
      localStorage.setItem('Token', token);
    }
    console.log('SUCCES');
  }

  private handleLoginError(message: string) {
    this.showAlert = true;
    this.alertMessage = message;
  }
}
