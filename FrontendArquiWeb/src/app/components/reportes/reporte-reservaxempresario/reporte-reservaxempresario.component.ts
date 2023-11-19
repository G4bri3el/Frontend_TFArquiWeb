import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ReservaService } from 'src/app/service/reserva/reserva.service';

@Component({
  selector: 'app-reporte-reservaxempresario',
  templateUrl: './reporte-reservaxempresario.component.html',
  styleUrls: ['./reporte-reservaxempresario.component.css']
})
export class ReporteReservaxempresarioComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private rS: ReservaService) {}
  ngOnInit(): void {
    this.rS.getCount().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.usuarionombre);
      this.barChartData=[
        {
          data:data.map(item=>item.reservasxempresario),
          label:'Reservas',
          backgroundColor:'rgba(0,0,255,0.3)'
        }
      ]
    });
  }
}
