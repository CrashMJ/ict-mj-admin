import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { VodEnrollComponent } from './vod-enrollments.component';
import { EditVodEnrollComponent } from './edit-vod-enrollment/edit-vod-enrollments.component';

const routes: Routes = [
  {
    path: '',
    component: VodEnrollComponent,
  },
  {
    path: 'edit/:id',
    component: EditVodEnrollComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VodEnrollRoutingModule { }
