import { FormControl } from '@angular/forms';

export type FormModel<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

export interface LoginModel {
  email: string;
  password: string;
}

export type LoginFormModel = FormModel<LoginModel>;

export interface LoginResponseModel {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}
