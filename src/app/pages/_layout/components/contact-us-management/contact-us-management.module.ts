import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsManagementRoutingModule } from './contact-us-management-routing.module';
import { ContactUsModalComponent } from './contact-us-modal/contact-us-modal.component';
import { EditContactUsComponent } from './edit-contact-us/edit-contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ContactUsModalComponent, EditContactUsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContactUsManagementRoutingModule
  ]
})
export class ContactUsManagementModule { }
