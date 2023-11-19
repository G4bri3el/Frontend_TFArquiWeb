import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Bicicleta } from 'src/app/model/bicicleta';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-listar-bicicleta',
  templateUrl: './listar-bicicleta.component.html',
  styleUrls: ['./listar-bicicleta.component.css']
})
export class ListarBicicletaComponent {

  dataSource: MatTableDataSource<Bicicleta> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private bS: BicicletaService,
    private cS: CartService,
    private router: Router
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

  
  eliminar(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }

  onClickDelete(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }
  
  
  onClickUpdate( bicicleta: Bicicleta){
    const url = `/bicicleta/edicion/${bicicleta.bicicletaid}`; // Ajusta la URL según tus necesidades
    this.router.navigateByUrl(url);
  }
  

  /*
  dataSource: MatTableDataSource<Bicicleta> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'modelo', 'estado', 'precio', 'numaro', 'detalles', 'foto', 'local', 'eliminar', 'editar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bS: BicicletaService) {}

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

  eliminar(id: number) {
    this.bS.delete(id).subscribe((data) => {
      this.bS.list().subscribe((data) => {
        this.bS.setList(data);
      });
    });
  }*/
}
