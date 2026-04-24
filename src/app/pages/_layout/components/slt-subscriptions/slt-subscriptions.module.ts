import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SltSubscriptionsRoutingModule } from './slt-subscriptions-routing.module';
import { EditSltSubscriptionsComponent } from './edit-slt-subscriptions/edit-slt-subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [EditSltSubscriptionsComponent],
  imports: [
    CommonModule,
    SltSubscriptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class SltSubscriptionsModule { }
