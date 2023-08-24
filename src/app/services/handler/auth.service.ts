import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8090';

  constructor(private _httpClient: HttpClient) {}

  async login(username: string, password: string) {
    try {
      return await firstValueFrom(
        this._httpClient.post(
          this.apiUrl + '/login',
          { username, password },
          { observe: 'response' }
        )
      );
    } catch (error) {
      const e = error as HttpErrorResponse;

      return new HttpResponse({ status: e.status });
    }
  }

  isAuthenticated() {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const claims = JSON.parse(
      decodeURIComponent(encodeURI(atob(token!.split('.')[1])))
    );

    const now = new Date().getTime() / 1000;

    if (claims.exp < now) {
      return false;
    }

    return true;
  }

  async logout() {
    return await firstValueFrom(
      this._httpClient.post(this.apiUrl + '/api/usuario/logout', {})
    );
  }

  setToken(token: string) {
    localStorage.setItem('at', token.replace('Bearer ', ''));
  }

  getToken() {
    return localStorage.getItem('at');
  }

  removeToken() {
    localStorage.removeItem('at');
  }
}
