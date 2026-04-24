import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingManagementComponent } from './setting-management.component';
import { EditSettingComponent } from './edit-setting/edit-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingManagementComponent,
},
{
    path: 'edit/:id',
    component: EditSettingComponent,

}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingManagementRoutingModule { }
