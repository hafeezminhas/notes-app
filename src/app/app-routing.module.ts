// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth
import { AuthGuard } from './app-commons/guards/auth-guard';
import { BaseComponent } from "./app-commons/base/base.component";

const routes: Routes = [
	{
		path: '',
		loadChildren:   './modules/home/home.module#HomeModule'
	}, {
		path: '',
		loadChildren:   './auth/auth.module#AuthModule',
	}, {
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren:   './modules/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'notes',
				loadChildren:   './modules/notes/notes.module#NotesModule',
				canActivate:    [AuthGuard]
			},
			{
				path: 'user',
				loadChildren:   './modules/user/user.module#UserModule',
				canActivate:    [AuthGuard]
			},
			// {
			// 	path: 'error/403',
			// 	component: ErrorPageComponent,
			// 	data: {
			// 		type: 'error-v6',
			// 		code: 403,
			// 		title: '403... Access forbidden',
			// 		desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
			// 	}
			// },
			// {path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'login', pathMatch: 'full'},
			{path: '**', redirectTo: '', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
