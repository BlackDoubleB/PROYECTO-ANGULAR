import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpService: HttpClient) { }

  getSchedule(fecha: string){
    return this.httpService.post('http://localhost:3000/api/horarios',fecha)
  }
}
