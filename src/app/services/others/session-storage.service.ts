import { Injectable } from '@angular/core';
import { IUserInformation } from 'src/app/config/interfaces/userInformation.interface';
import { ESesionStorage } from 'src/app/config/sessionStorage.enum';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  setInformationSession(userInformation: IUserInformation) {
    sessionStorage.setItem(
      ESesionStorage.USERINFORMATION,
      window.btoa(JSON.stringify(userInformation))
    );
  }

  /* getInformationSession():IUserInformation{
    const userInformationSession = sessionStorage.getItem(ESesionStorage.USERINFORMATION) as string;
      return JSON.parse(window.atob(userInformationSession));
  } */
}
