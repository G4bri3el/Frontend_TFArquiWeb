import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Reserva } from 'src/app/model/reserva';
import { ReservaService } from 'src/app/service/reserva/reserva.service';
import { UserDataService } from 'src/app/service/user-data/user-data.service';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent {
  dataSource: MatTableDataSource<Reserva> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'fechainicio', 'fechafin', 'monto', 'usuario'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  idUser: number = 0;

  constructor(private rS:ReservaService, private uDS: UserDataService){}
  ngOnInit(): void {
    this.loadUserData();


    this.rS.getReservasByUser(this.idUser).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }

  loadUserData(): void {
    this.uDS.getUserData().subscribe((data) => {
      this.idUser = data.usuarioId;
      console.log("Id usuari:"+this.idUser);
    });
  }
}
