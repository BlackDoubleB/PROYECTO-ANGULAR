import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/config/interfaces/dataResponse.interface';
import { HorarioReserva } from 'src/app/model/horarioReserva.model';

@Injectable({
  providedIn: 'root',
})
export class HorarioReservaApiService {
  private _url = 'http://localhost:8090/api/horario';

  constructor(private httpService: HttpClient) {}

  /* getConsumidor() {
        return this.httpService.get('http://localhost:3000/api/consumidor');
  } */

  getHorariosReservaPorFecha(
    fecha: string
  ): Observable<HttpResponse<DataResponse<HorarioReserva>>> {
    return this.httpService.get(this._url + `/${fecha}`, {
      observe: 'response',
    }) as Observable<HttpResponse<DataResponse<HorarioReserva>>>;
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
