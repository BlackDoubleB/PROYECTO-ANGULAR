import { Injectable } from '@angular/core';
import { AuthService } from '../handler/auth.service';
import { User } from 'src/app/model/user.model';

@Injectable()
export class UserState {
  public user: User = new User();

  constructor(private _authService: AuthService) {}

  getUser() {
    if (!this.user) {
      this.setUser();
    }

    return this.user;
  }

  setUser() {
    if (!this.user) {
      this.user = new User();
    }

    const claims = this.getClaims();

    this.user.deserialize(claims);
  }

  getClaims() {
    return JSON.parse(
      decodeURIComponent(
        encodeURI(atob(this._authService.getToken()!.split('.')[1]))
      )
    );
  }
}
