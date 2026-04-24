import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsFreeCardRoutingModule } from './subscription-free-cards-routing.module';
import { EditComponent } from './edit-subscription-free-cards/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { CreateFreeCardModalComponent } from './create/create-modal.component';


@NgModule({
  declarations: [EditComponent, CreateFreeCardModalComponent],
  imports: [
    CommonModule,
    SubscriptionsFreeCardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class SubscriptionsFreeCardModule { }
