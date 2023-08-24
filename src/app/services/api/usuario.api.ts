import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearCuentaRequest } from 'src/app/config/interfaces/request/crearCuenta.interface';
import { TransactionResponse } from 'src/app/config/interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioApiService {
  private _url = 'http://localhost:8090/api/usuario';

  constructor(private httpService: HttpClient) {}

  /* getConsumidor() {
        return this.httpService.get('http://localhost:3000/api/consumidor');
  } */

  postCrearUsuario(
    request: CrearCuentaRequest
  ): Observable<HttpResponse<TransactionResponse>> {
    return this.httpService.post(this._url + `/create`, request, {
      observe: 'response',
    }) as Observable<HttpResponse<TransactionResponse>>;
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
