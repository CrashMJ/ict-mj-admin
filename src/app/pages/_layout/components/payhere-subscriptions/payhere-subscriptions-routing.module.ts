import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayhereSubscriptionsComponent } from './payhere-subscriptions.component';
import { EditPayhereSubscriptionsComponent } from './edit-payhere-subscriptions/edit-payhere-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: PayhereSubscriptionsComponent,
  },
  {
    path: 'edit/:id',
    component: EditPayhereSubscriptionsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayhereSubscriptionsRoutingModule { }
