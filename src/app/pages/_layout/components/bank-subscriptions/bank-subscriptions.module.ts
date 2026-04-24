import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SltSubscriptionsRoutingModule } from './bank-subscriptions-routing.module';
import { EditBankSubscriptionsComponent } from './edit-bank-subscriptions/edit-bank-subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [EditBankSubscriptionsComponent],
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
export class BankSubscriptionsModule { }
