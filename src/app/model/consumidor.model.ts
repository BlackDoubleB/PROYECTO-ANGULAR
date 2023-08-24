import { Persona } from './persona.model';
import { Rol } from './rol.model';

export interface Consumidor {
  idConsumidor: number;
  usuario: string;
  persona: Persona;
  rol: Rol;
}
