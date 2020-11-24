import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadsPanelComponent } from './leads-panel/leads-panel.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LeadsHomeComponent } from './leads-home/leads-home.component';
import { RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NewLeadComponent } from './new-lead/app-new-lead.component';
import { NewLeadOpportunityTableComponent } from './new-lead/components/opportunity-table/opportunity-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    NgbAlertModule,
  ],
  declarations: [
    LeadsPanelComponent,
    LeadsHomeComponent,
    LeadDetailsComponent,
    NewLeadOpportunityTableComponent,
    NewLeadComponent,
  ]
})
export class LeadsModule {}
