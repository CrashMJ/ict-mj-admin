import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrRoutingModule } from "./open-resources-routing.module";
import { EditPaymentComponent } from "./edit-payment/edit-payment.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { OpenResourceModelComponent } from "./open-resource/model.component";
import { NgxJsonViewerModule } from "ngx-json-viewer";

@NgModule({
  declarations: [OpenResourceModelComponent, EditPaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OrRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule,
  ],
})
export class OpenResourcesModule {}
