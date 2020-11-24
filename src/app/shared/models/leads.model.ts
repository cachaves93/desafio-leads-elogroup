import { LeadOpportunityEnum, LeadStatusEnum } from '../enums/enum-bundle';
import { OpportunityTableModel } from './opportunity-table.model';

export interface RegisterNewLeadModel {
  name: string;
  phone: string;
  email: string;
  opportunityTableModel: OpportunityTableModel;
}

export interface LeadModel {
  id: number;
  name: string;
  status: LeadStatusEnum;
  phone: string;
  email: string;
  opportunities: LeadOpportunityEnum[];
}
