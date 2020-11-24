import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonSizeEnum } from 'src/app/shared/enums/enum-bundle';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public loginButtonSize: ButtonSizeEnum = ButtonSizeEnum.BIG;

  public hasAlert: boolean;
  public alertMessage: string;

  private redirectUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    this.activatedRoute.queryParams.subscribe(
      (defaultObject: any) => {
        this.redirectUrl = defaultObject.redirectUrl;
      }
    );
  }

  login(): void {

    const username: string = this.loginForm.get('username').value;

    const password: string = this.loginForm.get('password').value;

    this.authService.login(
      username, password
    ).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.redirectUrl
          ? this.router.navigate([`${this.redirectUrl}`])
          : this.router.navigate(['/features/home']);
        } else {
          this.hasAlert = true;
          this.alertMessage = res.message;
        };
      }
    );
  }

  handleCloseAlert(): void {
    this.hasAlert = false;
  }
}
