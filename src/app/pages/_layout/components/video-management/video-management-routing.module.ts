import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoManagementComponent } from 'src/app/pages/_layout/components/video-management/video-management.component';
import { EditVideoComponent } from 'src/app/pages/_layout/components/video-management/edit-video/edit-video.component';
import { GetAllVideoResolver } from './resolver/getAllVideo.resolver';

const routes: Routes = [
  {
    path: '',
    component: VideoManagementComponent,
    resolve:{
      videoDetails:GetAllVideoResolver
    }

},
{
    path: 'edit/:id',
    component: EditVideoComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoManagementRoutingModule { }
