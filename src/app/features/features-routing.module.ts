import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';
import { HomeComponent } from '../features/home/home.component';
import { LeadDetailsComponent } from '../features/leads/lead-details/lead-details.component';
import { LeadsPanelComponent } from './leads/leads-panel/leads-panel.component';
import { FeaturesComponent } from './features.component';
import { NewLeadComponent } from './leads/new-lead/app-new-lead.component';
import { LeadsHomeComponent } from './leads/leads-home/leads-home.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        component: HomeComponent,
      },
      {
        path: 'leads',
        canActivate: [AuthGuard],
        component: LeadsHomeComponent,
      },
      {
        path: 'leads/leads-panel',
        canActivate: [AuthGuard],
        component: LeadsPanelComponent,
      },
      {
        path: 'leads/leads-details/:leadId',
        canActivate: [AuthGuard],
        component: LeadDetailsComponent,
      },
      {
        path: 'leads/new-lead',
        canActivate: [AuthGuard],
        component: NewLeadComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule {}
