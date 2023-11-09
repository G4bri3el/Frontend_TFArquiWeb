import { Injectable } from '@angular/core';
import { Bicicleta } from 'src/app/model/bicicleta';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProduct: Bicicleta[] = [];
  private _products: BehaviorSubject<Bicicleta[]>;
  constructor() { 
    this._products = new BehaviorSubject<Bicicleta[]>([]);
  }

  addNewProduct(bici: Bicicleta) {
    this.cartProduct.push(bici);
    this._products.next(this.cartProduct);//.next() envia la informacion de la lista cartproduct, para el resto de componentes que esten suscritos lo puedan ver
  }

  get products() {
    return this._products.asObservable();
  }
}
