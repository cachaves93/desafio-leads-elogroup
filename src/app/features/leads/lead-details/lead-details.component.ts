import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadModel } from 'src/app/shared/models/leads.model';
import { GetLeadRequest, LeadsListRequest } from 'src/app/shared/models/requests.model';
import { LeadsService } from '../services/leads-service.service';

@Component({
  templateUrl: 'lead-details.component.html',
  styleUrls: ['lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  public isLoadingPage: boolean = true;

  public leadModel: LeadModel;

  constructor(
    private leadsService: LeadsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {

    const leadId: number = Number(this.activatedRoute.snapshot.params.leadId);

    const getLeadRequest: GetLeadRequest = {
      requestType: 'get-lead',
      leadId
    };

    this.leadsService.getLeadsList(getLeadRequest)
    .subscribe(
      (res: any) => {
        this.leadModel = res;
        this.isLoadingPage = false;
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/']);
      }
    );

  }

}
