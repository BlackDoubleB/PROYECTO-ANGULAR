import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/config/interfaces/dataResponse.interface';
import { ActualizarReservaRequest } from 'src/app/config/interfaces/request/actualizarReserva.interface';
import { RegistrarReservaRequest } from 'src/app/config/interfaces/request/resgistrarReserva.interface';
import { TransactionResponse } from 'src/app/config/interfaces/transaction.interface';
import { Reserva } from 'src/app/model/reserva.model';

@Injectable({
  providedIn: 'root',
})
export class ReservaApiService {
  private _url = 'http://localhost:8090/api/reserva';

  constructor(private httpService: HttpClient) {}

  /* getConsumidor() {
        return this.httpService.get('http://localhost:3000/api/consumidor');
  } */

  postRegistrarReserva(
    request: RegistrarReservaRequest
  ): Observable<HttpResponse<TransactionResponse>> {
    return this.httpService.post(this._url + `/create`, request, {
      observe: 'response',
    }) as Observable<HttpResponse<TransactionResponse>>;
  }

  putRegistrarReserva(
    request: ActualizarReservaRequest
  ): Observable<HttpResponse<TransactionResponse>> {
    return this.httpService.post(this._url + `/update`, request, {
      observe: 'response',
    }) as Observable<HttpResponse<TransactionResponse>>;
  }

  getReservaPorId(
    idReserva: number
  ): Observable<HttpResponse<DataResponse<Reserva>>> {
    return this.httpService.get(this._url + `/${idReserva}`, {
      observe: 'response',
    }) as Observable<HttpResponse<DataResponse<Reserva>>>;
  }

  getReservasPorConsumidor(
    idConsumidor: number
  ): Observable<HttpResponse<DataResponse<Reserva>>> {
    return this.httpService.get(this._url + `/table/${idConsumidor}`, {
      observe: 'response',
    }) as Observable<HttpResponse<DataResponse<Reserva>>>;
  }

  getReservasPorConsumidorYFecha(
    idConsumidor: number,
    fecha: string
  ): Observable<HttpResponse<DataResponse<Reserva>>> {
    return this.httpService.get(this._url + `/table/${idConsumidor}/${fecha}`, {
      observe: 'response',
    }) as Observable<HttpResponse<DataResponse<Reserva>>>;
  }

  /* createConsumidor(consumidor) {
        return this.httpService.post('http://localhost:3000/api/consumidor', consumidor);
  }
  
    updateConsumidor(consumidor) {
        return this.httpService.put('http://localhost:3000/api/consumidor/' + consumidor._id, consumidor);
  }
  
    deleteConsumidor(id) {
        return this.httpService.delete('http://localhost:3000/api/consumidor/' + id);
    } */
}
