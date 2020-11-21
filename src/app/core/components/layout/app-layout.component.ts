import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-component',
  templateUrl: 'app-layout.component.html',
  styleUrls: ['app-layout.component.scss'],
})
export class AppLayoutComponent {

  public isSidebarOpen: boolean = true;

  handleSidebarToggle(): void {
    console.log('toggled');
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
