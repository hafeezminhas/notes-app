import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {LayoutModule} from "../layout/layout.module";
import { RegisterComponent } from './register/register.component';
import {AppCommonsModule} from "../app-commons/app-commons.module";

const routes = [
	{ path : 'login', component: LoginComponent },
	{ path : 'forgotpassword', component: ForgotPasswordComponent },
	{ path : 'resetpassword', component: ResetPasswordComponent },
	{ path : 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
	RouterModule.forChild(routes),
	LayoutModule,
	AppCommonsModule
  ]
})
export class AuthModule { }
