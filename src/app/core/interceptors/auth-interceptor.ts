import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { LeadModel } from 'src/app/shared/models/leads.model';
@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    /*
    const token = JSON.parse(localStorage.getItem('jwtTokenEloGroup'));

     Sets auth for request with proper backend and JWT
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token.value),
      });

    } else {

      this.router.navigate(['auth/login'], {
        queryParams: {
          redirectUrl: window.location.hash
        }
      });
    }
    */

    switch (req.body.requestType) {
      case 'login':
        const isValid: boolean = this.checkLogin(
          req.body.username,
          req.body.password,
        );


        if (isValid) {
          return of(
            new HttpResponse({
              status: 200,
              body: {
                status: 200,
                message: 'Login com sucesso!'
              }
            })
          );
        } else {
          return of(
            new HttpResponse({
              status: 401,
              body: {
                status: 401,
                message: 'Não foi possível encontrar um usuário com os dados informados'
              }
            })
          );
        }

      case 'register-user':

        const previousUsers: any = JSON.parse(
          this.localStorageService.getItem('eloGroupUsers')
        );

        this.localStorageService.setObject({
          eloGroupUsers: JSON.stringify([
              ...previousUsers,
              {
                username: req.body.username,
                password: req.body.password
              }
            ])
          });

        return of(
          new HttpResponse({
            status: 200,
            body: {
              message: 'Usuário Registrado com Sucesso!'
            }
          })
        );
      case 'list-leads':

        const leadsListData: any = JSON.parse(
          this.localStorageService.getItem('eloGroupLeads')
        );

        return of(
          new HttpResponse({
            status: 200,
            body: leadsListData
          })
        );

      case 'update-leads':
        this.localStorageService.setObject({
          eloGroupLeads: JSON.stringify(
            req.body.leadsList
          )
        });

        return of(
          new HttpResponse({
            status: 200,
            body: {
              message: 'Alteração realizada com sucesso!'
            }
          })
        );

      case 'register-new-lead':

        const previousLeads: any = JSON.parse(
          this.localStorageService.getItem('eloGroupLeads')
        );

        const newId: number = Number(
          previousLeads[previousLeads.length - 1].id
        );

        this.localStorageService.setObject({
          eloGroupLeads: JSON.stringify([
              ...previousLeads,
              {
                id: newId,
                name: req.body.name,
                status: req.body.status,
                phone: req.body.phone,
                email: req.body.email,
                opportunities: req.body.opportunities
              }
            ])
          });

        return of(
          new HttpResponse({
            status: 200,
            body: {
              message: 'Lead registrada com sucesso!'
            }
          })
        );

      case 'get-lead':

        const allLeads: any = JSON.parse(
          this.localStorageService.getItem('eloGroupLeads')
        );

        const leadFound: LeadModel = allLeads.find(
          (lead: LeadModel) => {
            return Number(lead.id) === Number(req.body.leadId);
          }
        );

        return of(
          new HttpResponse({
            status: 200,
            body: leadFound
          })
        );

      default:
        return of();
    }
  }

  checkLogin(
    username: string,
    password: string,
  ): boolean {

    const users: any = JSON.parse(
      this.localStorageService.getItem('eloGroupUsers')
    );



    const userFound = users.find(
      (user: any) => {
        return user.username === username
        && user.password === password;
      }
    );

    if (userFound) this.localStorageService.setToken(
      btoa(`${username}${password}`).toString()
    );

    return userFound ? true : false;
  }
}
