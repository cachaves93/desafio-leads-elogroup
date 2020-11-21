import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard';
import { HomeComponent } from '../features/home/home.component';
import { LeadDetailsComponent } from '../features/leads/lead-details/lead-details.component';
import { ListLeadsComponent } from './leads/leads-list/leads-list.component';
import { FeaturesComponent } from './features.component';

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
        children: [
          {
            path: 'leads-list',
            component: ListLeadsComponent,
          },
          {
            path: 'leads-details/:leadId',
            component: LeadDetailsComponent,
          }
        ]
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
