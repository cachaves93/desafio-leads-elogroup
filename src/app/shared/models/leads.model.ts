import { OpportunityTableModel } from './opportunity-table.model';

export interface RegisterNewLeadModel {
  name: string;
  phone: string;
  email: string;
  opportunityTableModel: OpportunityTableModel;
}
