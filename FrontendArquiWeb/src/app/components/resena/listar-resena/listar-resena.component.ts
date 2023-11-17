import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Resena } from 'src/app/model/resena';
import { ResenaService } from 'src/app/service/resena/resena.service';

@Component({
  selector: 'app-listar-resena',
  templateUrl: './listar-resena.component.html',
  styleUrls: ['./listar-resena.component.css']
})
export class ListarResenaComponent implements OnInit{
  dataSource: MatTableDataSource<Resena> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo', 'numeroestrellas', 'comentario', 'reserva'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;



  //SE AÑADIÓ RESERVA SERVICE EN EL CONTRUCTOR Y EL METODO
  //constructor(private reS:ResenaService){
    //const idUsuario = 1; // Ajusta según el ID de usuario que quieras obtener
    //this.reS.obtenerResenasPorUsuario(idUsuario).subscribe(
    //  resenas => {
    //    this.reS = resenas;
    //    // Hacer algo con las resenas obtenidas...
    //  },
    //  error => {
    //    console.error('Error al obtener resenas por usuario:', error);
    //  }
    //);
  //}

  constructor(private reS:ResenaService){}

  ngOnInit(): void {
    this.reS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.reS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });

  }

  
  
}
