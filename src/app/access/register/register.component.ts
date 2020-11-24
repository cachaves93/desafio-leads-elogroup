import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private authService: AuthService,
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

    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;

    this.authService.register(
      username, password
    ).subscribe(
      (res: any) => {
        this.registerForm.reset();
        this.hasNotification = true;
        this.notificationMessage = res.message;
      }
    );
  }

  handleClose(): void {
    this.hasNotification = false;
  }

}
