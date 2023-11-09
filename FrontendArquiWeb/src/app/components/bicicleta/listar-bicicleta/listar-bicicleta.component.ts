import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Bicicleta } from 'src/app/model/bicicleta';
import { BicicletaService } from 'src/app/service/bicicleta/bicicleta.service';

@Component({
  selector: 'app-listar-bicicleta',
  templateUrl: './listar-bicicleta.component.html',
  styleUrls: ['./listar-bicicleta.component.css']
})
export class ListarBicicletaComponent {
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
  }
}
