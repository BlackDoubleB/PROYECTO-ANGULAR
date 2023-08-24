import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/handler/auth.service';
import { ToastService } from 'src/app/services/utils/toast.service';
import { UserState } from 'src/app/services/state/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _toastService: ToastService,
    private _userState: UserState
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async doLogin() {
    const response = await this._authService.login(
      this.loginForm.value.user,
      this.loginForm.value.password
    );

    let status = response?.status;

    if (status == 401 || status == 403) {
      this._toastService.showAlert(
        'Usuario o contraseña incorrectos',
        'Error',
        'error'
      );
      return;
    }

    let token = response?.headers.get('Authorization');

    if (!token || !token.startsWith('Bearer ')) {
      this._toastService.showAlert(
        'No ha sido posible autenticar al usuario ingresado.',
        'Error',
        'error'
      );
      return;
    }

    this._authService.setToken(token);
    this._userState.setUser();

    this.router.navigateByUrl('/layout');
  }

  createAccount(evt: any) {
    evt.preventDefault();

    this.router.navigateByUrl('/crear-cuenta');
  }
}
