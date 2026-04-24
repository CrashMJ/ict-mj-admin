import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentManagementComponent } from 'src/app/pages/_layout/components/student-management/student-management.component';
import { EditStudentComponent } from 'src/app/pages/_layout/components/student-management/edit-student/edit-student.component';
import { GetAllStudentResolver } from 'src/app/pages/_layout/components/student-management/resolvers/getAllStudent.resolver';

const routes: Routes = [
  {
    path: '',
    component: StudentManagementComponent,
    resolve: {
      studentDetails: GetAllStudentResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditStudentComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentManagementRoutingModule { }
