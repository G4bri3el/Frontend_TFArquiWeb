import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bicicleta } from 'src/app/model/bicicleta';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';

@Component({
  selector: 'app-listar-bicicleta-cliente',
  templateUrl: './listar-bicicleta-cliente.component.html',
  styleUrls: ['./listar-bicicleta-cliente.component.css']
})
export class ListarBicicletaClienteComponent {
  dataSource: MatTableDataSource<Bicicleta> = new MatTableDataSource();

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
}
