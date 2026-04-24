import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { LivePaymentComponent } from './payments.component';
import { EditLivePaymentComponent } from './edit-payment/edit-payment.component';

const routes: Routes = [
  {
    path: '',
    component: LivePaymentComponent,
  },
  {
    path: 'edit/:id',
    component: EditLivePaymentComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivePaymentRoutingModule { }
