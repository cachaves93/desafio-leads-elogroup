import { LeadStatusEnum } from '../enums/enum-bundle';

export interface LeadsListResponseData {
  id: number;
  name: string;
  status: LeadStatusEnum;
}
