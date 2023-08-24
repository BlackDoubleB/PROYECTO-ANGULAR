import { Consumidor } from './consumidor.model';
import { EstadoReserva } from './estadoReserva.model';
import { HorarioReserva } from './horarioReserva.model';

export interface Reserva {
  idReserva: number;
  cantidadPersonas: string;
  comentariosAdicionales: string;
  ticket: number;
  consumidor: Consumidor;
  horarioReserva: HorarioReserva;
  estadoReserva: EstadoReserva;
}
