import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PaymentRoutingModule } from "./payments-routing.module";
import { EditPaymentComponent } from "./edit-payment/edit-payment.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { PaymentModelComponent } from "./payment/payment-model.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";

@NgModule({
  declarations: [PaymentModelComponent, EditPaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaymentRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule,
  ],
})
export class PaymentsModule {}
