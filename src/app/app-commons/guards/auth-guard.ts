import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";
import {HttpService} from "../../services/http.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService, private httpService: HttpService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const redirectUrl = route['_routerState']['url'];
        if(this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { redirectUrl } });
        return false;
    }
}
