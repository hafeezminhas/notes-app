import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommonsModule } from './app-commons/app-commons.module';
import { LayoutModule } from './layout/layout.module';
import { JwtInterceptor } from './app-commons/helpers/jwt-interceptor';
import { ErrorInterceptor } from './app-commons/helpers/error-interceptor';
import { HttpService } from './services/http.service';
import { HttpConfiguration } from './app-commons/helpers/http-configuration';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,

		AppCommonsModule,
		LayoutModule
	],
	exports: [],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		HttpService,
		HttpConfiguration
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
