import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCommentManagementComponent } from './video-comment-management.component';

const routes: Routes = [
  {
    path: '',
    component: VideoCommentManagementComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoCommentManagementRoutingModule { }
