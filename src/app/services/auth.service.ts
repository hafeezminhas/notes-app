import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, delay, map, timeout} from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

import {User} from "../models/user";
import {Router} from "@angular/router";
import {PasswordUpdate} from "../models/password-update";
import {UserLogin} from "../models/user-login";

const tokenKey = 'NOTES_API_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	private jwtHelper = new JwtHelperService();

	constructor(private httpService: HttpService, private router: Router) {
		this.currentUserSubject = new BehaviorSubject<User>(this.getTokenPayload());
		this.currentUser = this.currentUserSubject.asObservable();
		if(this.isLoggedIn()) {
			this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));
		}
	}

	getToken() {
		let token = localStorage.getItem(tokenKey);
		if(token && this.jwtHelper.isTokenExpired(token)) {
			this.logout();
			return;
		}

		return token;
	}

	updateToken(tok) {
		localStorage.setItem(tokenKey, tok);
	}

	private getTokenPayload() {
		if(!localStorage.getItem(tokenKey) || this.jwtHelper.isTokenExpired(localStorage.getItem(tokenKey))) {
			this.router.navigate(['login']);
			return;
		}
		return this.jwtHelper.decodeToken(this.getToken());
	}

	public isLoggedIn() {
		const token = localStorage.getItem(tokenKey);
		if(token === null)
			return false;

		return !this.jwtHelper.isTokenExpired(token);
	}

	public get currentUserValue(): User {
		if(!this.currentUserSubject) {
			this.router.navigate(['login']);
		}
		return this.currentUserSubject.value;
	}

	login(payload: UserLogin) {
		return this.httpService.Post<any>(`auth/login`, payload).pipe(
			delay(500),
			map(res => {
				if (res && res.data.token) {
					localStorage.setItem(tokenKey, res.data.token);
					localStorage.setItem('currentUser', JSON.stringify(res.data.user));
					this.currentUserSubject.next(res.data.user);
					return res.data.user;
				}

				return false;
			}),
			catchError((e: HttpErrorResponse) => throwError(e))
		);
	}

	logout() {
		localStorage.removeItem(tokenKey);
		localStorage.removeItem('currentUser');
		if(this.currentUserSubject) {
			this.currentUserSubject.next(null);
		}
		this.router.navigate(['login']);
	}

	changePassword(data: PasswordUpdate) {
		return this.httpService.Post('users/password' , data).pipe(
			map(res => {
				this.updateToken(res.token);
				window.location.reload();
				return res;
			})
		);
	}
}
