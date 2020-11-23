import { LeadStatusEnum } from 'src/app/shared/enums/enum-bundle';
import { LeadsListResponseData } from 'src/app/shared/models/responses.model';

export const leadsListMockData: LeadsListResponseData[] = [
  {
    id: 1,
    name: 'Org. Internacionais',
    status: LeadStatusEnum.CLIENTE_EM_POTENCIAL,
  },
  {
    id: 2,
    name: 'Ind. Farmacêutica Ltda',
    status: LeadStatusEnum.DADOS_CONFIRMADOS,
  },
  {
    id: 3,
    name: 'Musc. Sound Live Cmp',
    status: LeadStatusEnum.REUNIAO_AGENDADA,
  }
];
