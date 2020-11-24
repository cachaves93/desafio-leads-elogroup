import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: 'app-header.component.html',
    styleUrls: ['app-header.component.scss']
})
export class AppHeaderComponent {

  constructor(
    private authService: AuthService,
  ) {}

  @Input() isMobile: boolean;

  @Output()
  toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  toggleSidebarClick(): void {
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }

}
