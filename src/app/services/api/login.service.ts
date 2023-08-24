import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/config/interfaces/userData.interface';
import { IUserInformation } from 'src/app/config/interfaces/userInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpClient) { }

  doLogin(userData: IUserData) {
    return this.httpService.post<IUserInformation>('http://localhost:3000/api/login', userData);
  }
  
}
