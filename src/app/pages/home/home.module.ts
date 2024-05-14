import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {RouterModule} from "@angular/router";
import {LineChartComponentComponent} from "./line-chart-component/line-chart-component.component";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent
      },
    ]),
    LineChartComponentComponent
  ],
  exports: [HomeComponent, LineChartComponentComponent],
})
export class HomeModule { }
