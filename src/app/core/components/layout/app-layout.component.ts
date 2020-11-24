import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout-component',
  templateUrl: 'app-layout.component.html',
  styleUrls: ['app-layout.component.scss'],
})
export class AppLayoutComponent {

  constructor() {
    this.checkWindowWidth(window.innerWidth);
  }

  public isMobile: boolean;
  public isSidebarOpen: boolean = true;

  @HostListener('window:resize', ['$event'])
  handleResize(event: any): void {
    this.checkWindowWidth(event.target.innerWidth);
  }

  checkWindowWidth(currentWidth: number): void {
    currentWidth < 768
    ? this.updateMobile(true)
    : this.updateMobile(false);
  }

  updateMobile(isMobile: boolean): void {
    this.isSidebarOpen = !isMobile;
    this.isMobile = isMobile;
  }

  handleSidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
