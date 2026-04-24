import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalAmountsTextComponent } from 'src/app/pages/_layout/components/dashboard/total-amounts-text/total-amounts-text.component';
import { ReportComponent } from 'src/app/pages/_layout/components/report/report.component';
import { IncomeLiveReportComponent } from './income-live/income-live.component';
import { IncomeVodSubsReportComponent } from './income-vod-subscription/income-vod.component';
import { IncomeVodReportComponent } from './income-vod/income-vod.component';
import { ClassPaymentsReportComponent } from './class-payments/class-payments.component';
import { ProfitLiveReportComponent } from './profit-live/profit-live.component';
import { ProfitVodReportComponent } from './profit-vod/profit-vod.component';
import { StudentRegistrationsReportComponent } from './student-registrations/student-registrations.component';
import { LessonPaymentsReportComponent } from './lesson-payments/lesson-payments.component';
const routes: Routes = [
   {
    path: '',
    component: ReportComponent,
  },
  {
    path: 'student-registration',
    component: StudentRegistrationsReportComponent,
    resolve: {
      // studentDetails: GetAllStudentResolver
    }
  },
  {
    path: 'lesson-payments',
    component: LessonPaymentsReportComponent,
  },
  {
    path: 'class-payments',
    component: ClassPaymentsReportComponent,
  },
  {
    path: 'profit-live',
    component: ProfitLiveReportComponent,
  },
  {
    path: 'profit-vod',
    component: ProfitVodReportComponent,
  },
  {
    path: 'income-live',
    component: IncomeLiveReportComponent,
  },
  {
    path: 'income-vod-video',
    component: IncomeVodReportComponent,
  },
  {
    path: 'income-vod-subscription',
    component: IncomeVodSubsReportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
