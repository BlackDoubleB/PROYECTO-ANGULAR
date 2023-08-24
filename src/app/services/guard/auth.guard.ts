import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../handler/auth.service';
import { UserState } from '../state/user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userState: UserState
  ) {}

  canActivate() {
    if (this._authService.isAuthenticated()) {
      this._userState.setUser();
      return true;
    }

    this._router.navigate(['/login']);
    return false;
  }
}
