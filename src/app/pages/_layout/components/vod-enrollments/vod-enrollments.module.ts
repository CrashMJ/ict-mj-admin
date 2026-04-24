import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VodEnrollRoutingModule } from './vod-enrollments-routing.module';
import { EditVodEnrollComponent } from './edit-vod-enrollment/edit-vod-enrollments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgxJsonViewerModule } from "ngx-json-viewer";

@NgModule({
  declarations: [EditVodEnrollComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    VodEnrollRoutingModule,
    InlineSVGModule,
    NgxJsonViewerModule,
  ]
})
export class VodEnrollsModule { }
