import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: 'page-title.component.html',
  styleUrls: ['page-title.component.scss']
})
export class PageTitleComponent {

  @Input() title: string;

  @Input() hasNavigatorArrow: boolean = true;

  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

}
