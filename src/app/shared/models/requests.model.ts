import { LeadOpportunityEnum, LeadStatusEnum } from '../enums/enum-bundle';

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
