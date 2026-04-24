import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayhereSubscriptionsRoutingModule } from './payhere-subscriptions-routing.module';
import { EditPayhereSubscriptionsComponent } from './edit-payhere-subscriptions/edit-payhere-subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [EditPayhereSubscriptionsComponent],
  imports: [
    CommonModule,
    PayhereSubscriptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class PayhereSubscriptionsModule { }
