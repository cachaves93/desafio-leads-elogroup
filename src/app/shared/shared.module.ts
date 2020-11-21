import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    PageTitleComponent,
  ],
  exports: [
    PageTitleComponent,
  ]
})
export class SharedModule {}
