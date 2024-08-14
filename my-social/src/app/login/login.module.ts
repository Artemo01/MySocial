import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
