import { LeadOpportunityEnum, LeadStatusEnum } from 'src/app/shared/enums/enum-bundle';
import { LeadModel } from 'src/app/shared/models/leads.model';

export const leadsListMockData: LeadModel[] = [
  {
    id: 1,
    name: 'Org. Internacionais',
    status: LeadStatusEnum.CLIENTE_EM_POTENCIAL,
    phone: '(31) 9999-9999',
    email: 'fulano@bol.com.br',
    opportunities: [
      LeadOpportunityEnum.PRODUTO_DIGITAL
    ]
  },
  {
    id: 2,
    name: 'Ind. Farmacêutica Ltda',
    status: LeadStatusEnum.DADOS_CONFIRMADOS,
    phone: '(31) 9999-9999',
    email: 'siclano@gmail.com',
    opportunities: [
      LeadOpportunityEnum.RPA,
      LeadOpportunityEnum.BPM
    ]
  },
  {
    id: 3,
    name: 'Musc. Sound Live Cmp',
    status: LeadStatusEnum.REUNIAO_AGENDADA,
    phone: '(31) 9999-9999',
    email: 'beltrano@yahoo.com.br',
    opportunities: [
      LeadOpportunityEnum.ANALYTICS
    ]
  }
];
