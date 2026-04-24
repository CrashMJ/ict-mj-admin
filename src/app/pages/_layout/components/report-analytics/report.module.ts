import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportAnalyticsRoutingModule } from './report-routing.module';
import { ReportAnalyticsComponent } from './report.component';
import { AudienceReportComponent } from './audience/audience.component';
import { BehaviorReportComponent } from './behavior/behavior.component';
import { AcquisitionsReportComponent } from './acquisitions/acquisitions.component';


@NgModule({
  declarations: [ReportAnalyticsComponent,AudienceReportComponent,BehaviorReportComponent,AcquisitionsReportComponent],
  imports: [
    CommonModule,
    ReportAnalyticsRoutingModule
  ],
  exports: []
})
export class ReportAnalyticsModule { }
