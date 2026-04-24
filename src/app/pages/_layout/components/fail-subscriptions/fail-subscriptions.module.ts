import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailSubscriptionsRoutingModule } from './fail-subscriptions-routing.module';
import { EditFailSubscriptionsComponent } from './edit-fail-subscriptions/edit-fail-subscriptions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ConfirmationRetryComponent } from './confirmation-retry/confirmation-retry.component';


@NgModule({
  declarations: [EditFailSubscriptionsComponent, ConfirmationRetryComponent],
  imports: [
    CommonModule,
    FailSubscriptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class FailSubscriptionsModule { }
