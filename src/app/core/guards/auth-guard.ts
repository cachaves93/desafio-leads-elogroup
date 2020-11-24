import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const canAtivate: boolean = this.authService.isAuthenticated();

    if (!canAtivate) {
      this.router.navigate(['auth/login', {
        redirectUrl: state.url.toString()
      }]);
    }

    return canAtivate;
  }
}
