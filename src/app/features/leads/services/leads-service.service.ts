import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeadModel } from 'src/app/shared/models/leads.model';
import { GetLeadRequest, LeadsListRequest, NewLeadRequestModel, UpdateLeadsRequest } from 'src/app/shared/models/requests.model';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(
    private http: HttpClient
  ) {}


  getLeadsList(
    leadsListRequest: LeadsListRequest
  ): Observable<LeadModel[]> {
    return this.http.post<LeadModel[]>(
      ``, leadsListRequest
    );
  }

  getLeadData(
    getLeadRequest: GetLeadRequest
  ): Observable<LeadModel> {
    return this.http.post<any>(
      ``, getLeadRequest
    )
  }

  registerNewLead(
    registerNewLeadRequest: NewLeadRequestModel
  ): Observable<any> {
    return this.http.post<any>(
      ``, registerNewLeadRequest
    );
  }

  updateLeadsList(
    updateLeadsRequest: UpdateLeadsRequest
  ): Observable<any> {
    return this.http.post<any>(
      ``, updateLeadsRequest
    );
  }

}
