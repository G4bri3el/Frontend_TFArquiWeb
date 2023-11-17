import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Bicicleta } from 'src/app/model/bicicleta';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  bicicletas: Bicicleta[] = [];
  total: number = 0;
  constructor(private cS: CartService) {}

  ngOnInit(): void {
    this.cS.products.subscribe((bici) => {
      this.bicicletas = bici;
    });

    this.cS.products.pipe(map(bicicleta => {
      return bicicleta.reduce((prev, bicicleta) => prev + bicicleta.bicicletaprecio, 0);
    })).subscribe(val=>{
      this.total = val;
    });
  }

  remove(indice: number) {
    this.cS.deleteProduct(indice);
  }
}
