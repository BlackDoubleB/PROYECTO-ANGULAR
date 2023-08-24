import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaApiService {
  private _url = 'http://localhost:8090/api/media';

  constructor(private httpService: HttpClient) {}

  /* getConsumidor() {
        return this.httpService.get('http://localhost:3000/api/consumidor');
  } */

  getArchivoPorNombre(nombreArchivo: string): Observable<HttpResponse<Blob>> {
    return this.httpService.get(this._url + `/${nombreArchivo}`, {
      observe: 'response',
      responseType: 'blob',
    }) as Observable<HttpResponse<Blob>>;
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
