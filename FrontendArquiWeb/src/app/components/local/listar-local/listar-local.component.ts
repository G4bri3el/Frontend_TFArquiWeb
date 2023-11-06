
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Local } from 'src/app/model/local';
import { LocalService } from 'src/app/service/local/local.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-local',
  templateUrl: './listar-local.component.html',
  styleUrls: ['./listar-local.component.css']
})
export class ListarLocalComponent implements OnInit {
  dataSource: MatTableDataSource<Local> = new MatTableDataSource();
  displayedColumns: string[] =
    ['codigo', 'nombre', 'direccion', 'usuario'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private lS: LocalService) {

  }
  ngOnInit(): void {
    this.lS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    });
  }
}
