import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiLogRoutingModule } from './api-log-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { EditApiLogComponent } from './edit/edit.component';

@NgModule({
  declarations: [EditApiLogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiLogRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule
  ]
})
export class ApiLogManagementModule { }
