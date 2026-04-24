import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentLogManagementComponent } from 'src/app/pages/_layout/components/payment-log/payment-log.component';
import { EditPaymentLogComponent } from 'src/app/pages/_layout/components/payment-log/edit-payment-log/edit-payment-log.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentLogManagementComponent,
  },
  {
    path: 'edit/:id',
    component: EditPaymentLogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentLogRoutingModule { }
