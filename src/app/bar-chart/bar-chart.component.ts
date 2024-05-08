import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NodeDataService } from '../service/node-data.service';
import { Subscription } from 'rxjs';
import { CapitalPipe } from '../pipes/capital.pipe';

interface SensorData {
  time: string;
  temperature: number;
  smoke: string;
  gas: string;
  motion: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnDestroy {
  @ViewChild('chart') private chartRef!: ElementRef<HTMLCanvasElement>;

  selectedSeries: { name: string, value: number }[] = [];
  routeParams: string = '';
  data: SensorData[] = [];
  dataSubscription: Subscription | undefined;

  constructor(private dataArray: NodeDataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((param: ParamMap) => {
    //   this.routeParams = param.get('id') || '';
    //   this.updateData();
    // });
    this.route.paramMap.subscribe((paramMap) => {
      const paramId = paramMap.get('id');
      if (paramId) {
        this.routeParams = paramId;
        this.updateData(); // Refresh data based on the new parameter
      } else {
        console.error('Route parameter "id" is undefined');
      }
    });
    
    // this.routeParams = this.route.snapshot.url[1].path;
    // console.log(this.routeParams)
    // if(this.routeParams !== ''){
    //   this.updateData();
    // }
  }

  ngOnDestroy() {
    // Clean up subscriptions to prevent memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private updateData() {
    this.dataSubscription = this.dataArray.getData().subscribe((data1: SensorData[]) => {
      this.data = data1;
      this.formatDataForChart();
      this.createChart();
    }, error => {
      // Handle errors here
      console.error('Error fetching data:', error);
    });
  }

  private formatDataForChart(): void {
    switch (this.routeParams) {
      case 'temperature':
        this.selectedSeries = this.data.map(item => ({
          name: this.getTimeAgo(item.time),
          value: item.temperature
        }));
        break;
      case 'smoke':
        this.selectedSeries = this.data.map(item => ({
          name: this.getTimeAgo(item.time),
          value: parseFloat(item.smoke)
        }));
        break;
      case 'gas':
        this.selectedSeries = this.data.map(item => ({
          name: this.getTimeAgo(item.time),
          value: parseFloat(item.gas)
        }));
        break;
      case 'motion':
        this.selectedSeries = this.data.map(item => ({
          name: this.getTimeAgo(item.time),
          value: item.motion
        }));
        break;
      default:
        // Handle default case
    }
  }

  private createChart(): void {
    const ctx = this.chartRef?.nativeElement.getContext('2d');
        // Add null check for ctx
    if (!ctx) {
        return;
    }

    const existChart = Chart.getChart(ctx);
    if(existChart){
  existChart.destroy();
  }
    if (ctx && this.selectedSeries.length > 0) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.selectedSeries.map(item => item.name),
          datasets: [{
            label: this.routeParams,
            data: this.selectedSeries.map(item => item.value),
            backgroundColor: '#16C79E',
            borderColor: '#109173',
            tension: 0.1,
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }

  getTimeAgo(time: string): string {
    const currentTime = new Date();
    const dataTime = new Date(time);
    const timeDiff = Math.abs(currentTime.getTime() - dataTime.getTime());
    let timeAgo: string;

    if (timeDiff < 60000) { // Less than 1 minute
      timeAgo = "Just now";
    } else if (timeDiff < 3600000) { // Less than 1 hour
      const minutesAgo = Math.round(timeDiff / (1000 * 60));
      timeAgo = `${minutesAgo} minutes ago`;
    } else { // 1 hour or more
      const hoursAgo = Math.round(timeDiff / (1000 * 60 * 60));
      timeAgo = `${hoursAgo} hours ago`;
    }

    return timeAgo;
  }

   getItemSubtitle(key:any):any{
      if(key === 'temperature'){
        return "Degree in C"
      }else if(key ==="smoke"){
        return "ppm"
      }else if (key ==="gas"){
        return "ppm"
      }else {
        return "Binary"
      }
    }
    getIconString(key:any):any{
      switch(key){
      case "temperature":
        return "fa fa-thermometer-three-quarters fa-2xl";
      case "smoke":
        return "fa fa-fire-extinguisher fa-2xl";
      case "gas":
        return "fa fa-fire fa-2xl";
      case "motion":
        return "fa fa-eye fa-2xl";
      default:
        return "";
      }
    }

    getBgColor(){
      let value = 0;
      let key = this.routeParams;
      let arr = this.data[0];
       if (!arr) {
    return ""; // Return default background color or handle the case when data is not available
  }
      switch(key){
      case 'temperature':
        value = arr.temperature
        if(value <20){
          return "bg-info"
        }else if(value <=25){
           return "bg-warning"
         }else{
           return "bg-danger"
        }
      case 'smoke':
        value = parseFloat(arr.smoke)
        if(value <65){
          return "bg-info"
        }else {
          return "bg-danger"
        }
      case 'gas':
        value = parseFloat(arr.gas)
        if(value < 70){
          return "bg-info"
        }else if (value <=350){
          return "bg-warning"
        }else{
          return "bg-danger"
        }
      case 'motion':
        value = arr.motion
        if(value == 0){
          return "bg-info"
        }else{
          return "bg-danger"
        }
      default:
        return ""
      }
    }
}
