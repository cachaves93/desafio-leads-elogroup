import { NgModule } from '@angular/core';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { CoreComponentsModule } from '../core/components/core-components.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    FeaturesRoutingModule,
    CoreComponentsModule,
    MatIconModule,
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule {}
