import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { ListLeadsComponent } from './leads-list/leads-list.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
  ],
  declarations: [
    ListLeadsComponent,
    LeadDetailsComponent,
  ]
})
export class LeadsModule {}
