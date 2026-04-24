import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerManagementRoutingModule } from './banner-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BannerModalComponent } from './banner-modal/banner-modal.component';
import { EditBannerComponent } from './edit-banner/edit-banner.component';
import { GetAllBannerResolver } from './resolvers/getAllBanner.resolver';
import { BannerService } from './services/banner.service';
import { InlineSVGModule } from 'ng-inline-svg';


@NgModule({
  declarations: [BannerModalComponent, EditBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BannerManagementRoutingModule,
    InlineSVGModule
  ],
  providers:[
    GetAllBannerResolver,
    BannerService
  ]
})
export class BannerManagementModule { }
