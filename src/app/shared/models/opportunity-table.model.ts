import { LeadOpportunityEnum } from '../enums/enum-bundle';

export interface OpportunityTableModel {
  rows: OpportunityTableRow[];
}

export interface OpportunityTableRow {
  label: string;
  checked: boolean;
  value: LeadOpportunityEnum;
}
