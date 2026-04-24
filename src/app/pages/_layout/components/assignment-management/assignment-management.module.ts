import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AssignRoutingModule } from "./assignment-management.routing.module";
import { EditInqComponent } from "./edit/edit.component";
import { InqModelComponent } from "./model/model.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { InlineSVGModule } from "ng-inline-svg";
import { InqModel2Component } from "./model2/model.component";
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [EditInqComponent, InqModelComponent, InqModel2Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AssignRoutingModule,
    InlineSVGModule,
    NgbRatingModule
  ],
})
export class AssignManagementModule {}
