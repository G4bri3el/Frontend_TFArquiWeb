import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Bicicleta } from 'src/app/model/bicicleta';
import { Detalledereserva } from 'src/app/model/detalledereserva';
import { Reserva } from 'src/app/model/reserva';
import { CartService } from 'src/app/service/cart/cart.service';
import { DetalledereservaService } from 'src/app/service/detalledereserva/detalledereserva.service';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  bicicletas: Bicicleta[] = [];
  total: number = 0;
  reserva: Reserva = new Reserva();
  fechaFin: Date = new Date(Date.now());

  idRev: number = 0;
  detalleReserva: Detalledereserva = new Detalledereserva();

  constructor(private cS: CartService, private rS: ReservaService, private drS: DetalledereservaService) {}

  ngOnInit(): void {
    this.cS.products.subscribe((bici) => {
      this.bicicletas = bici;
    });

    this.cS.products
      .pipe(
        map((bicicleta) => {
          return bicicleta.reduce(
            (prev, bicicleta) => prev + bicicleta.bicicletaprecio,
            0
          );
        })
      )
      .subscribe((val) => {
        this.total = val;
      });
  }

  remove(indice: number) {
    this.cS.deleteProduct(indice);
  }

  checkout(): void {
    this.reserva.reservafechafin = this.fechaFin;
    this.reserva.reservamontototal = this.total;
    this.reserva.usuario.usuarioId = 1;
     this.rS.insert(this.reserva).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });

    //Obtener el ultimo id de la reserva
    this.rS.getList().subscribe((data) => {
      this.idRev = data[data.length - 1].reservaid;
      console.log(this.idRev);
    });
    //Insertar en detalle reserva cada bicicleta
    

    this.detalleReserva.reserva.reservaid = this.idRev;
    this.detalleReserva.bicicleta.bicicletaid = 1;
    this.drS.insert(this.detalleReserva).subscribe((data) => {
      this.drS.list().subscribe((data) => {
        this.drS.setList(data);
      });
    });

  }
}
