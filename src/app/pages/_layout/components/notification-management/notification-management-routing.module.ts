import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationManagementComponent } from 'src/app/pages/_layout/components/notification-management/notification-management.component';
import { EditNotificationComponent } from 'src/app/pages/_layout/components/notification-management/edit-notification/edit-notification.component';
import { GetAllNotificationResolver } from './resolvers/getAllNotification.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotificationManagementComponent,
    resolve: {
      notificationDetails: GetAllNotificationResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditNotificationComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationManagementRoutingModule { }
