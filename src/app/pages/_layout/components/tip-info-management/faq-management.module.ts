import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FaqManagementRoutingModule } from "./faq-management-routing.module";
import { EditFaqComponent } from "./edit-faq/edit-faq.component";
import { FaqModelComponent } from "./faq-model/faq-model.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";

@NgModule({
  declarations: [EditFaqComponent, FaqModelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FaqManagementRoutingModule,
    InlineSVGModule,
  ],
})
export class TipInfoManagementModule {}
