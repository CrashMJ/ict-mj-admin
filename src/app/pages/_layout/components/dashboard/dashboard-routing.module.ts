import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalAmountsTextComponent } from 'src/app/pages/_layout/components/dashboard/total-amounts-text/total-amounts-text.component';
import { DashboardComponent } from 'src/app/pages/_layout/components/dashboard/dashboard.component';
const routes: Routes = [
   {
    path: '',
    component: DashboardComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
