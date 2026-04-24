import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsManagementComponent } from './contact-us-management.component';
import { GetAllContactUsResolver } from './resolvers/getAllContactUs.reslover';
import { EditContactUsComponent } from './edit-contact-us/edit-contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsManagementComponent,
    resolve: {
      contactUsDetails: GetAllContactUsResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditContactUsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsManagementRoutingModule { }
