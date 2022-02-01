import { ChartService } from './../_services/chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      myScale: {
        type: 'logarithmic',
        position: 'right', // `axis` is determined by the position as `'y'`
      }
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  publ



  constructor(public chartService: ChartService) { }


  ngOnInit() {
    this.chartService.startConnection();
    this.chartService.addTransferChartDataListener();
    this.startHttpRequest();
  }


  private startHttpRequest(){
    this.chartService.getChart().subscribe(response => {
      console.log(response);
    });
  }
}
