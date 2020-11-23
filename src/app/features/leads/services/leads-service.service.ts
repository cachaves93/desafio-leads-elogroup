import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadsListRequest, NewLeadRequestModel } from 'src/app/shared/models/requests.model';
import { LeadsListResponseData } from 'src/app/shared/models/responses.model';
import { LeadsModule } from '../leads.module';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(
    private http: HttpClient
  ) {}


  getLeadsList(
    leadsListRequest: LeadsListRequest
  ): Observable<LeadsListResponseData[]> {
    return this.http.post<LeadsListResponseData[]>(
      ``, leadsListRequest
    );
  }

  registerNewLead(
    registerNewLeadRequest: NewLeadRequestModel
  ): Observable<any> {
    return this.http.post<any>(
      ``, registerNewLeadRequest
    );
  }


}
