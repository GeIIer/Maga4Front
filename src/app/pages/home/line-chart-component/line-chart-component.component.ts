import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';
import {NgTemplateOutlet} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Dot} from "../../../core/models/data";
import {Function} from "../../../core/models/function";
import {FunctionService} from "../../../service/function.service";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import _default from "chart.js/dist/core/core.interaction";
import x = _default.modes.x;

@Component({
  selector: 'app-line-chart-component',
  templateUrl: './line-chart-component.component.html',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatInput
  ],
  styleUrl: './line-chart-component.component.css'
})
export class LineChartComponentComponent implements OnInit {
  @ViewChild("readOnlyTemplate", {static: false}) readOnlyTemplate: TemplateRef<any> | undefined;
  public data: Dot[] = [{x: 0, y: 1}, {x: 1, y: 2}, {x: 2, y: 1}];
  public function!: Function;
  public lineChart: any;
  paramA: number = 1;
  paramB: number = 1;
  paramC: number = 1;
  displayedColumns: string[] = ['x', 'y', 'удалить'];

  @ViewChild(MatTable) table!: MatTable<Dot>;

  constructor(private functionServes: FunctionService) {
  }

  ngOnInit() {
    this.functionServes.getFunction(this.paramA, this.paramB, this.paramC).subscribe((data) => {
      this.function = data;
      console.log(this.function);
      this.createLineChart();
    })
  }

  createLineChart() {
    let numbersX: number[] = this.function.dots.map(value => value.x);
    let numbersY: number[] = this.function.dots.map(value => value.y);
    this.lineChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: numbersX,
        datasets: [
          {
            label: "Function",
            data: numbersY,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 1.5,
        scales: {
          x: {
            axis: "x",
            border: {
              color: "black"
            },
          },
          y: {
            axis: "y",
            border: {
              color: "black"
            },
          },
        }
      }
    });
  }

  refreshFunction() {
    this.functionServes.getFunction(this.paramA, this.paramB, this.paramC).subscribe((data) => {
      this.function = data;
      console.log(this.function);
      if (this.lineChart) {
        this.lineChart.destroy();  // График удаляется.
      }
      this.createLineChart();
    })
  }

  changeFunction(myFunction: Function) {
    this.function.dots = this.function.dots.sort((a, b) => a.x - b.x);
    this.function.dots = this.uniqArray(this.function.dots);
    console.log(this.function);
    this.functionServes.changeFunction(myFunction).subscribe((data) => {
      this.function = data;
      console.log(this.function);
      if (this.lineChart) {
        this.lineChart.destroy();  // График удаляется.
      }
      this.createLineChart();
    })
  }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.function.dots.length);
    this.function.dots.push(this.function.dots[randomElementIndex]);
    this.table.renderRows();
  }

  removeData(x: number) {
    this.function.dots = this.function.dots.filter(dot => dot.x !== x);
    this.table.renderRows();
    this.changeFunction(this.function);
  }

  change() {
    this.changeFunction(this.function);
  }

  private uniqArray(array: Dot[]) {
    let res: Dot[] = [];
    let map = new Map();
    for (let ob of array) {
      if (!map.has(ob.x)) {
        console.log(ob);
        map.set(ob.x, 1);
        res.push(ob);
      }
    }
    return res;
  }
}
