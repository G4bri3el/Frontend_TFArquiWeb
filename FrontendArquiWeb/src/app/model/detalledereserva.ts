import { Bicicleta } from './bicicleta';
import { Reserva } from "./reserva";

export class Detalledereserva{
    detalleId: number = 0;
    reserva: Reserva = new Reserva();
    bicicleta: Bicicleta = new Bicicleta();
}
