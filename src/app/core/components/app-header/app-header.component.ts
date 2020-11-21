import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html'
})
export class AppHeaderComponent {

  @Output()
  toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  toggleSidebarClick(): void {
    this.toggleSidebar.emit();
  }

}
