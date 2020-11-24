import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    MatIconModule,
    MatCardModule,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
