import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-amount',
  templateUrl: './pie-chart-amount.component.html',
  styleUrls: ['./pie-chart-amount.component.scss']
})
export class PieChartAmountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  name = 'Angular 6';
  view: any[] = [500, 500];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#5AA454"]
  };

    single: any[] = [
    {
      name: "Germany",
      value: 8940000
    },
    {
      name: "USA",
      value: 5000000
    },
    {
      name: "France",
      value: 7200000
    }
  ];
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  chartOptions = {
    responsive: true
  };

  onSelect(event) {
    console.log(event);
  }

}
