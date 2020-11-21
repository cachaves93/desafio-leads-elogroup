import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = JSON.parse(localStorage.getItem('jwtToken'));

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token.value),
      });

      return next.handle(cloned);
    } else {
      this.router.navigate(['auth/login'], {
        queryParams: {
          redirectUrl: window.location.hash
        }
      });
    }
  }
}
