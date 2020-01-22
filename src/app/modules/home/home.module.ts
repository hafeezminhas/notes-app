import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterModule} from "@angular/router";
import {AppCommonsModule} from "../../app-commons/app-commons.module";
import {LayoutModule} from "../../layout/layout.module";

const routes = [
	{ path : '', component: HomeComponent }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
  	CommonModule,
	RouterModule.forChild(routes),
	AppCommonsModule,
	LayoutModule
  ]
})
export class HomeModule { }
