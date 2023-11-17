import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bicicleta } from 'src/app/model/bicicleta';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-listar-bicicleta-cliente',
  templateUrl: './listar-bicicleta-cliente.component.html',
  styleUrls: ['./listar-bicicleta-cliente.component.css']
})
export class ListarBicicletaClienteComponent {
  dataSource: MatTableDataSource<Bicicleta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private bS: BicicletaService,
    private cS: CartService
    ) {}


  ngOnInit(): void {
    this.bS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    //metodo que actualiza el listado automaticamente
    this.bS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

  }

  onClick( bicicleta: Bicicleta){
    this.cS.addNewProduct(bicicleta);
  }
  
  TieneFoto(bici: Bicicleta){
    if(bici.bicicletafoto == " " || bici.bicicletafoto == ""){
      return false;
    }else{
      return true;
    }
  }

  NoTieneFoto(bici: Bicicleta){
    if(bici.bicicletafoto == " " || bici.bicicletafoto == ""){
      return true;
    }else{
      return false;
    }
  }
}
