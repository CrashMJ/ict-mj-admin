import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminManagementRoutingModule } from './admin-management-routing.module';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AdminModalComponentComponent } from './admin-modal-component/admin-modal-component.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SortIconComponent } from 'src/app/_metronic/shared/crud-table/components/sort-icon/sort-icon.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { BrowserModule } from '@angular/platform-browser';
import { EditAdminComponent } from './edit-admin/edit-admin.component';


@NgModule({
  declarations: [CreateAdminComponent, AdminModalComponentComponent, EditAdminComponent],
  imports: [
    // BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminManagementRoutingModule,
    // SortIconComponent
  ],
  exports: [
    AdminModalComponentComponent
  ]
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],

})
export class AdminManagementModule { }
