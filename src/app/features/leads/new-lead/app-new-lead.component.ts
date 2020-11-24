import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
// Enums
import { ButtonSizeEnum, LeadOpportunityEnum, LeadStatusEnum } from 'src/app/shared/enums/enum-bundle';
import { RegisterNewLeadModel } from 'src/app/shared/models/leads.model';
import { OpportunityTableModel, OpportunityTableRow } from 'src/app/shared/models/opportunity-table.model';
import { NewLeadRequestModel } from 'src/app/shared/models/requests.model';

import { LeadsService } from 'src/app/features/leads/services/leads-service.service';

@Component({
  selector: 'app-new-lead',
  templateUrl: 'app-new-lead.component.html'
})
export class NewLeadComponent {

  @Input() hasNavigatorArrow: boolean = true;

  public registerNewLeadModel: RegisterNewLeadModel = {
    opportunityTableModel: {} as OpportunityTableModel
  } as RegisterNewLeadModel;

  public hasAlert: boolean = false;
  public alertMessage: string;

  constructor(
    private leadsService: LeadsService
  ) {}

  handleOpportunityTableContent(event: OpportunityTableModel): void {
    this.registerNewLeadModel.opportunityTableModel = event;
  }

  handleRegisterNewLead(): void {

    const { name, phone, email } = this.registerNewLeadModel;

    const selectedLeadOpportunity: LeadOpportunityEnum[] = this.registerNewLeadModel
    .opportunityTableModel.rows?.map(
      (row: OpportunityTableRow) => {
        if (row.checked) return row.value;
      }
    );

    const registerNewLeadRequest: NewLeadRequestModel = {
      requestType: 'register-new-lead',
      name,
      phone,
      email,
      status: LeadStatusEnum.CLIENTE_EM_POTENCIAL,
      opportunities: selectedLeadOpportunity
    };

    this.leadsService.registerNewLead(registerNewLeadRequest)
    .subscribe(
      (res: any) => {
        this.hasAlert = true;
        this.alertMessage = res.message;
      },
      (err: HttpErrorResponse) => {}
    );
  }

  handleCloseAlert(): void {
    this.hasAlert = false;
  }

}
