import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationManagementRoutingModule } from './notification-management-routing.module';
import { NotificationModelComponent } from './notification-model/notification-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditNotificationComponent } from './edit-notification/edit-notification.component';


@NgModule({
  declarations: [NotificationModelComponent, EditNotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationManagementRoutingModule
  ]
})
export class NotificationManagementModule { }
