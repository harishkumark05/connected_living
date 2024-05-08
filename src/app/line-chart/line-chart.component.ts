import { Component } from '@angular/core';
// import { single, multi } from '../data';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  // single: any[] = [];
  multi: any[] = [];

  view: any = [700, 400];
  
  data = [
  {"temperature":30.32,"smoke":"99","gas":"99","motion":0},
  {"temperature":24.95,"smoke":"98","gas":"98","motion":0},
  {"temperature":28.02,"smoke":"100","gas":"100","motion":0},
    {"temperature":24.95,"smoke":"98","gas":"98","motion":0},
  {"temperature":28.02,"smoke":"100","gas":"100","motion":0},
    {"temperature":24.95,"smoke":"98","gas":"98","motion":0},
  {"temperature":28.02,"smoke":"100","gas":"100","motion":0},
    {"temperature":24.95,"smoke":"98","gas":"98","motion":0},
  {"temperature":28.02,"smoke":"100","gas":"100","motion":0},
] 

  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  autoScale = true;

 colorScheme: any = {
  name: 'customScheme',
  selectable: true,
  group: 'Ordinal',
  domain: ['#FF5733', '#33FFA5', '#3366FF', '#FF33F2']
};;

  constructor() {
  }

  onSelect(event:any) {
    console.log(event);
  }

  ngOnInit(){
    this.multi = [
      {
        name: 'temperature',
        series: this.data.map((item, index) => ({
          name: `${(index + 1) * 15}`,
          value: item.temperature
        }))
      },
      {
        name: 'smoke',
        series: this.data.map((item, index) => ({
          name: `${(index + 1) * 15}`,
          value: parseFloat(item.smoke) // Convert smoke to number
        }))
      },
      {
        name: 'gas',
        series: this.data.map((item, index) => ({
          name: `${(index + 1) * 15}`,
          value: parseFloat(item.gas) // Convert gas to number
        }))
      },
      {
        name: 'motion',
        series: this.data.map((item, index) => ({
          name: `${(index + 1) * 15}`,
          value: item.motion
        }))
      }
    ];
  
    // return  Object.assign(this, {  multi });

  }

}
