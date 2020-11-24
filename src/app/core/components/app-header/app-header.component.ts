import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html',
    styleUrls: ['app-header.component.scss']
})
export class AppHeaderComponent {

  constructor(
    private authService: AuthService
  ) {}

  @Output()
  toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  toggleSidebarClick(): void {
    this.toggleSidebar.emit();
  }

  logout() {
    this.authService.logout();
  }

}
