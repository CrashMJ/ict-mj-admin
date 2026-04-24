import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditLiveClassComponent } from './edit-live-class/edit-live-class.component';
import { LiveClassManagementComponent } from './live-class-management.component';
import { GetAllLiveClassResolver } from './resolvers/getAllLiveClass.resolver';

const routes: Routes = [
  {
    path: '',
    component:LiveClassManagementComponent,
    resolve: {
      adminDetails: GetAllLiveClassResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditLiveClassComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassManagementRoutingModule { }
