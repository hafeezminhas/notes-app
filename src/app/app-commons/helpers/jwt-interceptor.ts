import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

import { AuthService } from '../../services/auth.service';
import {catchError, switchMap} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if(this.authService.getToken()) {
            request = this.addToken(request);
        }

        return next.handle(request);
    }

    private addToken(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${this.authService.getToken()}`
            }
        });
    }
}
