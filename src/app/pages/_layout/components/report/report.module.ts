import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { StudentRegistrationsReportComponent } from './student-registrations/student-registrations.component';
import { IncomeVodReportComponent } from './income-vod/income-vod.component';
import { IncomeLiveReportComponent } from './income-live/income-live.component';
import { ProfitLiveReportComponent } from './profit-live/profit-live.component';
import { ProfitVodReportComponent } from './profit-vod/profit-vod.component';
import { ClassPaymentsReportComponent } from './class-payments/class-payments.component';
import { LessonPaymentsReportComponent } from './lesson-payments/lesson-payments.component';


@NgModule({
  declarations: [ReportComponent,StudentRegistrationsReportComponent,IncomeVodReportComponent,IncomeLiveReportComponent,ClassPaymentsReportComponent, LessonPaymentsReportComponent, ProfitLiveReportComponent,ProfitVodReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ],
  exports: []
})
export class ReportModule { }
