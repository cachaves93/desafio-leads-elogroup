import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { leadsListMockData } from '../mock-data/leads-list';
import { LeadsListResponseData } from 'src/app/shared/models/responses.model';
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

    } else {
      /*
      this.router.navigate(['auth/login'], {
        queryParams: {
          redirectUrl: window.location.hash
        }
      });*/
    }

    switch (req.body.requestType) {
      case 'list-leads':
        return of(
          new HttpResponse({
            status: 200,
            body: leadsListMockData
          })
        );
      case 'register-new-lead':

        leadsListMockData.push(
          {
            id: 0,
            name: req.body.name,
            status: req.body.status
          } as LeadsListResponseData
        );

        return of(
          new HttpResponse({
            status: 200,
            body: {
              message: 'Lead registrada com sucesso!'
            }
          })
        );
      default:
        return of();
    }
  }
}
