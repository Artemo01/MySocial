import { FormControl } from '@angular/forms';

export type FormModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export interface AuthModel {
  email: string;
  password: string;
}

export type LoginFormModel = FormModel<AuthModel>;

export interface LoginResponseModel {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface RegisterFormModel {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}
