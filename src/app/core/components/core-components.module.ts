import { NgModule } from '@angular/core';
// Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
// Components Declarations
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
  ],
  declarations: [
    AppHeaderComponent,
    AppLayoutComponent
  ],
  exports: [
    AppLayoutComponent,
  ]
})
export class CoreComponentsModule {}
