import { Usuario } from './usuario';

export class Reserva {
  reservaid: number = 0;
  reservafechainicio: Date = new Date(Date.now());
  reservafechafin: Date = new Date(Date.now());
  reservamontototal: number = 0;
  usuario: Usuario = new Usuario();
}
