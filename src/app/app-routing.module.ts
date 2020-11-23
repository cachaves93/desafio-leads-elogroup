import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { LoginComponent } from './features/access/login/login.component';
import { LeadDetailsComponent } from './features/leads/lead-details/lead-details.component';
import { LeadsPanelComponent } from './features/leads/leads-panel/leads-panel.component';

const routes: Routes = [
  {
    path: 'features',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-my-password',
        component: LeadDetailsComponent,
      },
      {
        path: 'register',
        component: LeadDetailsComponent,
      }
    ]
  },
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'pages',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
