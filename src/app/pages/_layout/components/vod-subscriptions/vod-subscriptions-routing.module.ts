import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { VodSubscriptionComponent } from './vod-subscriptions.component';
import { EditVodSubscriptionComponent } from './edit-vod-subscriptions/edit-vod-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: VodSubscriptionComponent,
  },
  {
    path: 'edit/:id',
    component: EditVodSubscriptionComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VodSubscriptionRoutingModule { }
