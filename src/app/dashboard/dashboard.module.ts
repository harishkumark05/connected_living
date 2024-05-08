import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';


import { DashboardComponent } from './dashboard.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { DashboardRoutingModule } from './dashboard-routing.module'

@NgModule({
  declarations: [
     DashboardComponent,
    BarChartComponent,
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
      NgxChartsModule,
      SharedModule
      

  ],
  providers:[
    
    ]
})
export class DashboardModule { }
