import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ButtonSizeEnum } from 'src/app/shared/enums/enum-bundle';

@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {


  public registerButtonSize: ButtonSizeEnum = ButtonSizeEnum.BIG;

  public hasNotification: boolean = false;
  public notificationMessage: string;

  private passwordValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[\\W+|_+]).*$'),
    /* Composing option
    Validators.compose(
      [
        Validators.pattern(/^[0-9]+$/g),
        Validators.pattern(/^[A-Z]+$/gi),
        Validators.pattern(/^[\\W|\s|_]+$/g),
      ]
    ) */
  ];

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', this.passwordValidators),
    assertPassword: new FormControl('',
      Validators.compose([
        Validators.required,
        this.equalValue('password'),
      ]))
  });

  constructor(
    private localStorageService: LocalStorageService,
  ) {}

  equalValue(matchControlName: string)
  : (c: AbstractControl) => ValidationErrors| null {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.parent &&
      control.parent.value &&
      control.value === control.parent.controls[matchControlName].value
      ? null
      : {
        unequal: true
      } as ValidationErrors;
    };
  }

  register(): void {

    console.log('run register');
    /*
    this.localStorageService.setObject({
      eloGroupUser: this.registerForm.get('username'),
    });

    this.hasNotification = true;
    this.notificationMessage = 'Usuário Registrado com Sucesso!'; */
  }

  handleClose(): void {
    this.hasNotification = false;
  }

  logErrors(): void {
    console.log(
      this.registerForm.get('assertPassword').errors
    );
  }

}
