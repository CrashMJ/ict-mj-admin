import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlSquadPostManagementComponent } from './al-squad-post-management.component';
import { EditPollComponent } from './edit-poll/edit-poll.component';
import { AlSquadCommentComponent } from './al-squad-comment/al-squad-comment.component';

const routes: Routes = [
  {
    path: '',
    component: AlSquadPostManagementComponent,

  },
  {
    path: 'comments',
    component: AlSquadCommentComponent,

  },
  {
    path: 'poll/:id',
    component: EditPollComponent,

  },
  {
    path: 'edit/:id',
    component: EditPollComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlSquadPostManagementRoutingModule { }
