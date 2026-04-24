import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TotalAmountsTextComponent } from './total-amounts-text/total-amounts-text.component';
import { PieChartAmountComponent } from './pie-chart-amount/pie-chart-amount.component';
import { VodSummaryComponent } from './vod-summary/vod-summary.component';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { TotalRegistrationComponent } from './total-registration/total-registration.component';


@NgModule({
  declarations: [DashboardComponent, TotalAmountsTextComponent, PieChartAmountComponent, VodSummaryComponent, SummaryCardComponent, TotalRegistrationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [
    TotalAmountsTextComponent
  ]
})
export class DashboardModule { }
