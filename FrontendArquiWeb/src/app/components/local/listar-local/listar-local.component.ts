
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private lS: LocalService,
   // private cS: CartService
    ) {}


  ngOnInit(): void {
    this.lS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    //metodo que actualiza el listado automaticamente
    this.lS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

  }

  onClickUpdate( local: Local){
    
  }
  onClickDelete(id: number) {
    this.lS.delete(id).subscribe((data) => {
      this.lS.list().subscribe((data) => {
        this.lS.setList(data);
      });
    });
  }
  
  
  TieneFoto(local: Local){
    if(local.localfoto == " " || local.localfoto == ""){
      return false;
    }else{
      return true;
    }
  }

  NoTieneFoto(local: Local){
    if(local.localfoto == " " || local.localfoto == ""){
      return true;
    }else{
      return false;
    }
  }
}
