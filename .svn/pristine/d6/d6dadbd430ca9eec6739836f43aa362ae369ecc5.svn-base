// import { Injectable }       from '@angular/core';
// import {
//   CanActivate, Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot
// }                           from '@angular/router';
// import { AuthService }      from './authentication.service';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     let url: string = state.url;

//     return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
//     if (this.authService.isLoggedIn) { return true; }

//     // Store the attempted URL for redirecting
//     this.authService.redirectUrl = url;

//     // Navigate to the login page with extras
//     this.router.navigate(['/login']);
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
//import {CookieService,CookieOptionsArgs} from 'angular2-cookie/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, 
        private authenticationService:AuthenticationService,
        ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('userInfo')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}