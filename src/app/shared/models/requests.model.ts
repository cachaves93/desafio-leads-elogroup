import { LeadOpportunityEnum, LeadStatusEnum } from '../enums/enum-bundle';
import { LeadModel } from './leads.model';

export interface LeadsListRequest {
  requestType?: string;
}

export interface NewLeadRequestModel {
  requestType?: string;
  name: string;
  phone: string;
  email: string;
  status: LeadStatusEnum;
  opportunities: LeadOpportunityEnum[];
}

export interface UpdateLeadsRequest {
  requestType?: string;
  leadsList: LeadModel[];
}

export interface GetLeadRequest {
  requestType?: string;
  leadId: number;
}
