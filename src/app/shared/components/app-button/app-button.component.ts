import { Component, Input } from '@angular/core';
import { ButtonSizeEnum } from '../../enums/enum-bundle';

@Component({
  selector: 'app-button',
  templateUrl: 'app-button.component.html',
  styleUrls: ['app-button.component.scss']
})
export class AppButtonComponent {

  @Input() hasIcon: boolean;
  @Input() iconName: string;
  @Input() text: string;
  @Input() size: ButtonSizeEnum;

}
