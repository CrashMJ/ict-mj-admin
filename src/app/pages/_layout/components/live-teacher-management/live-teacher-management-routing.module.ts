import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveTeacherManagementComponent } from './live-teacher-management.component';
import { EditLiveTeacherComponent } from './edit-live-teacher/edit-live-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: LiveTeacherManagementComponent,

  },
  {
    path: 'edit/:id',
    component: EditLiveTeacherComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveTeacherManagementRoutingModule { }
