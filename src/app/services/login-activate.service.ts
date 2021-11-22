import {Inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WINDOW} from "./window.service";

@Injectable()
export class LoginActivate implements CanActivate {
    constructor(@Inject(WINDOW) private window: Window, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.window.walletConnection.isSignedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}