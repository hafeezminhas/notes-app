import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {LayoutModule} from "../layout/layout.module";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";

@NgModule({
	declarations: [BaseComponent],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		NgbModule,
		ToastrModule.forRoot()
	],
	exports: [
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		NgbModule,
		ToastrModule
	]
})
export class AppCommonsModule { }
