import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from 'src/app/config/interfaces/dataResponse.interface';
import { Consumidor } from 'src/app/model/consumidor.model';

@Injectable({
  providedIn: 'root',
})
export class ConsumidorApiService {
  private _url = 'http://localhost:8090/api/consumidor';

  constructor(private httpService: HttpClient) {}

  /* getConsumidor() {
        return this.httpService.get('http://localhost:3000/api/consumidor');
  } */

  getConsumidorById(
    idConsumidor: number
  ): Observable<HttpResponse<DataResponse<Consumidor>>> {
    return this.httpService.get(this._url + `/${idConsumidor}`, {
      observe: 'response',
    }) as Observable<HttpResponse<DataResponse<Consumidor>>>;
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
