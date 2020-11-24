import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MatDividerModule } from '@angular/material/divider';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropTableComponent } from './components/drag-drop-table/drag-drop-table.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    DragDropModule,
  ],
  declarations: [
    PageTitleComponent,
    AppButtonComponent,
    DragDropTableComponent,
  ],
  exports: [
    PageTitleComponent,
    AppButtonComponent,
    DragDropTableComponent,
  ]
})
export class SharedModule {}
