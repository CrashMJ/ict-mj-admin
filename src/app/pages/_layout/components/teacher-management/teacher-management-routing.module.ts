import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherManagementComponent } from 'src/app/pages/_layout/components/teacher-management/teacher-management.component';
import { EditTeacherComponent } from 'src/app/pages/_layout/components/teacher-management/edit-teacher/edit-teacher.component';
import { GetAllTeacherResolver } from 'src/app/pages/_layout/components/teacher-management/resolvers/getAllTeachers.resolver';

const routes: Routes = [
  {
    path: '',
    component: TeacherManagementComponent,
    resolve: {
      teacherDetails: GetAllTeacherResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditTeacherComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherManagementRoutingModule { }
