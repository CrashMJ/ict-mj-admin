import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SltSubscriptionsComponent } from './slt-subscriptions.component';
import { EditSltSubscriptionsComponent } from './edit-slt-subscriptions/edit-slt-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: SltSubscriptionsComponent,
  },
  {
    path: 'edit/:id',
    component: EditSltSubscriptionsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SltSubscriptionsRoutingModule { }
