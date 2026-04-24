import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentLogRoutingModule } from './payment-log-routing.module';
import { EditPaymentLogComponent } from './edit-payment-log/edit-payment-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [EditPaymentLogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaymentLogRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class PaymentLogManagementModule { }
