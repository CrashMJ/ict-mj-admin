import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FailSubscriptionsComponent } from './fail-subscriptions.component';
import { EditFailSubscriptionsComponent } from './edit-fail-subscriptions/edit-fail-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: FailSubscriptionsComponent,
  },
  {
    path: 'edit/:id',
    component: EditFailSubscriptionsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FailSubscriptionsRoutingModule { }
