import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
