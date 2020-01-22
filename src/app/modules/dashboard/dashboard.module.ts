import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterModule} from "@angular/router";
import {AppCommonsModule} from "../../app-commons/app-commons.module";

const routes = [
	{ path : '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
	  CommonModule,
	  RouterModule.forChild(routes),
	  AppCommonsModule
  ]
})
export class DashboardModule { }
