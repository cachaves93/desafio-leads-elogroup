import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    MatCardModule,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
