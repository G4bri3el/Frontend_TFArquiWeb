import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LocalService } from 'src/app/service/local/local.service';

@Component({
  selector: 'app-reporte-paccini',
  templateUrl: './reporte-paccini.component.html',
  styleUrls: ['./reporte-paccini.component.css']
})
export class ReportePacciniComponent implements OnInit {

  barChartOptions:ChartOptions={
    responsive:true
  };
  barChartLabels:string[]=[];
  barChartType:ChartType='bar'; //solo cambias el tipo, puede ser bar, doughnut, pie, polarArea, scatter, radar
  barChartLegend=true;
  barChartData:ChartDataset[]=[];
  constructor(private lS:LocalService){}

  ngOnInit(): void {
    this.lS.getCount().subscribe((data)=>(
      this.barChartLabels=data.map((item) => item.UsuarioNombre),
      this.barChartData=[
        {
          data:data.map((item)=>item.cantidadLocales),
          label:'Cantidad de locales por empresario',
          
        },
      ]
    ))
  }
}
