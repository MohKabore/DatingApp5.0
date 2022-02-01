import { Injectable } from '@angular/core';
import { ChartModel } from '../_models/chart.model';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public data: ChartModel[]=[];
  private hubConnection: HubConnection;
  hubUrl = environment.hubUrl;
  constructor(private http: HttpClient) {

  }
  public startConnection = () => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl+'chart')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
    //  console.log(data);
    });
  };

  public getChart() {
    return this.http.get('https://localhost:5001/api/chart');
  }
}
