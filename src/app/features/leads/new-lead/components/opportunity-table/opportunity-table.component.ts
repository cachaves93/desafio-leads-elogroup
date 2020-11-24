import { Component, EventEmitter, Output } from '@angular/core';
import { LeadOpportunityEnum } from 'src/app/shared/enums/enum-bundle';
import { OpportunityTableModel, OpportunityTableRow } from 'src/app/shared/models/opportunity-table.model';

@Component({
  selector: 'app-new-lead-opportunity-table',
  templateUrl: 'opportunity-table.component.html',
  styleUrls: ['opportunity-table.component.scss']
})
export class NewLeadOpportunityTableComponent {

  public checkAll: boolean = false;

  @Output() emitContent: EventEmitter<OpportunityTableModel> = new EventEmitter();

  public opportunityTableModel: OpportunityTableModel = {
    rows: [
      {
        label: 'RPA',
        checked: false,
        value: LeadOpportunityEnum.RPA,
      },
      {
        label: 'Produto Digital',
        checked: false,
        value: LeadOpportunityEnum.PRODUTO_DIGITAL,
      },
      {
        label: 'Analytics',
        checked: false,
        value: LeadOpportunityEnum.ANALYTICS,
      },
      {
        label: 'BPM',
        checked: false,
        value: LeadOpportunityEnum.BPM,
      }
    ]
  };

  emitTableContent(event: boolean): void {
    if (!event) this.checkAll = false;
    this.emitContent.emit(this.opportunityTableModel);
  }

  checkUncheckAll(): void {

    let newBoolean: boolean;

    this.checkAll
    ? newBoolean = true
    : newBoolean = false;

    this.opportunityTableModel.rows.forEach(
      (row: OpportunityTableRow) => row.checked = newBoolean
    );

    this.emitContent.emit(this.opportunityTableModel);
  }
}
