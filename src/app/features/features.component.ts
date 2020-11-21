import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'features.component.html',
  styleUrls: ['features.component.scss'],
})
export class FeaturesComponent {

  constructor(
    private router: Router,
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}
