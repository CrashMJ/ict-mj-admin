import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectManagementComponent } from 'src/app/pages/_layout/components/subject-management/subject-management.component';
import { EditSubjectComponent } from 'src/app/pages/_layout/components/subject-management/edit-subject/edit-subject.component';
import { GetAllSubjectResolver } from './resolvers/getAllSubject.resolver';

const routes: Routes = [
    {
        path: '',
        component: SubjectManagementComponent,
        resolve: {
            subjectDetails: GetAllSubjectResolver
          }
      

    },
    {
        path: 'edit/:id',
        component: EditSubjectComponent,

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubjectManagementRoutingModule { }
