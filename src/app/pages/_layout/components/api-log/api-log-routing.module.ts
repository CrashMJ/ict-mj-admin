import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiLogManagementComponent } from './api-log.component';
import { EditApiLogComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ApiLogManagementComponent,
  },
  {
    path: 'edit/:id',
    component: EditApiLogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiLogRoutingModule { }
