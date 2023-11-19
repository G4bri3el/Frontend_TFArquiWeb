import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { LocalService } from 'src/app/service/local/local.service';

@Component({
  selector: 'app-reporte-medina',
  templateUrl: './reporte-medina.component.html',
  styleUrls: ['./reporte-medina.component.css']
})
export class ReporteMedinaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private lS: LocalService) {}
  ngOnInit(): void {
    this.lS.getGanancias().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.localname);
      this.barChartData=[
        {
          data:data.map(item=>item.ganancia),
          label:'Ganancia',
          backgroundColor: 'rgba(104, 211, 154, 0.6)'
        }
      ]
    });
  }
}
