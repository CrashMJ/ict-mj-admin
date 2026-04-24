import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingMedalModalComponent } from './ranking-medal-modal/ranking-medal-modal.component';
import { RankingMedalsManagementComponent } from './ranking-medals-management.component';
import { EditMedalComponent } from './edit-medal/edit-medal.component';
import { StudentRankingComponent } from './student-ranking/student-ranking.component';

const routes: Routes = [
  {
    path: 'medal',
    component: RankingMedalsManagementComponent,
    resolve: {
      // studentDetails: GetAllStudentResolver
    }

  },
  {
    path: 'student',
    component: StudentRankingComponent,
    resolve: {
      // studentDetails: GetAllStudentResolver
    }

  },
  {
    path: 'medal/edit/:id',
    component: EditMedalComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingMedalsManagementRoutingModule { }
