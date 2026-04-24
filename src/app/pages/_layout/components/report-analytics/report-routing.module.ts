import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalAmountsTextComponent } from 'src/app/pages/_layout/components/dashboard/total-amounts-text/total-amounts-text.component';
import { ReportComponent } from 'src/app/pages/_layout/components/report/report.component';
import { AcquisitionsReportComponent } from './acquisitions/acquisitions.component';
import { AudienceReportComponent } from './audience/audience.component';
import { BehaviorReportComponent } from './behavior/behavior.component';

const routes: Routes = [
   {
    path: '',
    component: ReportComponent,
  },
  {
    path: 'acquisitions',
    component: AcquisitionsReportComponent,
    resolve: {
      // studentDetails: GetAllStudentResolver
    }
  },
  {
    path: 'audience',
    component: AudienceReportComponent,
  },
  {
    path: 'behavior',
    component: BehaviorReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportAnalyticsRoutingModule { }
