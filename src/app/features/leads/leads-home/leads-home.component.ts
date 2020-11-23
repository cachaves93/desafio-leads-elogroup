import { Component } from '@angular/core';
import { ButtonSizeEnum } from 'src/app/shared/enums/enum-bundle';

@Component({
  templateUrl: 'leads-home.component.html',
  styleUrls: ['leads-home.component.scss']
})
export class LeadsHomeComponent {
  public defaultButtonSize: ButtonSizeEnum = ButtonSizeEnum.BIG;
  public isHomePanel: boolean;

  constructor() {
    this.isHomePanel = true;
  }
}
