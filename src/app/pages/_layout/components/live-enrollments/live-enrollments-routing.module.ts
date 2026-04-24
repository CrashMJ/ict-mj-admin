import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { LiveEnrollComponent } from './live-enrollments.component';
import { EditLiveEnrollComponent } from './edit-live-enrollment/edit-live-enrollments.component';

const routes: Routes = [
  {
    path: '',
    component: LiveEnrollComponent,
  },
  {
    path: 'edit/:id',
    component: EditLiveEnrollComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveEnrollRoutingModule { }
