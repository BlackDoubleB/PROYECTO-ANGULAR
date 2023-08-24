import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaState {
  private observableListaReservaHandler = new Subject<void>();
  public sendListaReservaObservable =
    this.observableListaReservaHandler.asObservable();

  sendListaReserva() {
    this.observableListaReservaHandler.next();
  }
}
