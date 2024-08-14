import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../login.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
@UntilDestroy()
export class LoginFormComponent implements OnInit {
  public hide: boolean = true;
  public passwordInputType: 'password' | 'text' = 'password';

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
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
    this.loginService
      .login(this.form.value)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (response) => {
          console.log('OK');
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
