import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs';
import { Bicicleta } from 'src/app/model/bicicleta';
import { Detalledereserva } from 'src/app/model/detalledereserva';
import { Reserva } from 'src/app/model/reserva';
import { CartService } from 'src/app/service/cart/cart.service';
import { DetalledereservaService } from 'src/app/service/detalledereserva/detalledereserva.service';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { UserDataService } from 'src/app/service/user-data/user-data.service';

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
  idUser: number = 0;

  constructor(
    private cS: CartService,
    private rS: ReservaService,
    private drS: DetalledereservaService,
    private uDS: UserDataService,
  ) {}

  ngOnInit(): void {
    this.loadUserData();

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

    this.reserva.usuario.usuarioId = this.idUser; //sacar el id del usuario logueado
    this.rS.insert(this.reserva).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });

    //Obtener el ultimo id de la reserva
    this.rS.getList().subscribe((data) => {
      this.idRev = data[data.length - 1].reservaid;

      console.log(this.idRev);
      
    //Insertar en detalle reserva cada bicicleta
      this.registrarDetalleRes();
      this.cS.deleteTodo();
    });
  }

  idlist: Bicicleta[] = [];

  registrarDetalleRes(): void {
    this.cS.products.subscribe((data) => {
      this.idlist = data;
    });

    for (let j = 0; j < this.idlist.length; j++) {
      console.log(this.idlist[j].bicicletaid);

      const nuevoDetalleReserva: Detalledereserva = new Detalledereserva();
      nuevoDetalleReserva.reserva.reservaid = this.idRev;
      nuevoDetalleReserva.bicicleta.bicicletaid = this.idlist[j].bicicletaid;
      this.drS.insert(nuevoDetalleReserva).subscribe((data) => {
        this.drS.list().subscribe((data) => {
          this.drS.setList(data);
        });
      });
    }
  }

  loadUserData(): void {
    this.uDS.getUserData().subscribe((data) => {
      this.idUser = data.usuarioId;
      console.log("Id usuari:"+this.idUser);
    });
  }

}
