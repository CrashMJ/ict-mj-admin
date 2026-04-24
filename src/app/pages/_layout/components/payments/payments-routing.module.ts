import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetAllTipResolver } from './resolvers/getAllTips.resolver';
import { PaymentComponent } from './payments.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
  },
  {
    path: 'edit/:id',
    component: EditPaymentComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
