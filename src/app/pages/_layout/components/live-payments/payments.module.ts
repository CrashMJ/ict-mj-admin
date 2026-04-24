import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivePaymentRoutingModule } from './payments-routing.module';
import { EditLivePaymentComponent } from './edit-payment/edit-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';


@NgModule({
  declarations: [EditLivePaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LivePaymentRoutingModule,
    InlineSVGModule
  ]
})
export class LivePaymentsModule { }
