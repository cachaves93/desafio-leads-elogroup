import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() emitClose: EventEmitter<boolean> = new EventEmitter();

  public registerNewLeadModel: RegisterNewLeadModel = {
    opportunityTableModel: {} as OpportunityTableModel
  } as RegisterNewLeadModel;

  public hasAlert: boolean = false;
  public alertMessages: {type: string, message: string}[] = [];

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
    ).filter( item => item );

    const isValidForm: boolean = this.validateForm(selectedLeadOpportunity);

    if (!isValidForm) return;

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
        this.emitClose.emit(true);
        this.hasAlert = true;
        this.alertMessages = [{
          type: 'success',
          message: res.message
        }];
      },
      (err: HttpErrorResponse) => {}
    );
  }

  validateForm(
    selectedLeadOpportunity: LeadOpportunityEnum[]
  ): boolean {

    const { name } = this.registerNewLeadModel;

    const mandatoryFields: any = [
      { fieldName: 'Nome', value: name },
      { fieldName: 'Oportunidades', value: selectedLeadOpportunity }
    ];

    let errorFound: boolean = false;
    const errorFieldNames: string[] = [];

    mandatoryFields.every(
      (fieldData: any) => {
        if (!fieldData.value || fieldData.value.length === 0) {
          errorFound = true;
          errorFieldNames.push(fieldData.fieldName);
        }
        return true;
      }
    );

    if (!errorFound) return true;

    this.hasAlert = true;
    errorFieldNames.forEach(
      (fieldName: string) => this.alertMessages.push(
        {
          type: 'warning',
          message: `O campo '${fieldName}' é obrigatório`
        }
      )
    );

    return false;

  }

  handleCloseAlert(index: number): void {
    this.alertMessages.splice(index, 1);
    if (this.alertMessages.length === 0) this.hasAlert = false;
  }

}
