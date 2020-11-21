import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreComponentsModule } from './components/core-components.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreComponentsModule,
  ],
  exports: [
    CoreComponentsModule,
  ]
})
export class CoreModule {}
