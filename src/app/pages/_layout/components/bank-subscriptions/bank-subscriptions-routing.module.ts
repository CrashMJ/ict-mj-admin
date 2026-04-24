import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankSubscriptionsComponent } from './bank-subscriptions.component';
import { EditBankSubscriptionsComponent } from './edit-bank-subscriptions/edit-bank-subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: BankSubscriptionsComponent,
  },
  {
    path: 'edit/:id',
    component: EditBankSubscriptionsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SltSubscriptionsRoutingModule { }
