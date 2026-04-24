import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminManagementComponent } from 'src/app/pages/_layout/components/admin-management/admin-management.component';
import { CreateAdminComponent } from 'src/app/pages/_layout/components/admin-management/create-admin/create-admin.component';
import { EditAdminComponent } from 'src/app/pages/_layout/components/admin-management/edit-admin/edit-admin.component';
import { ProductsComponent } from 'src/app/modules/e-commerce/products/products.component';
import { GetAllAdminResolver } from './resolvers/getAllAdmin.resolver';
import { GetAdminByIdResolver } from './resolvers/getAdminById.resolver';

const routes: Routes = [
  {
    path: '',
    component:AdminManagementComponent,
    resolve: {
      adminDetails: GetAllAdminResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditAdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagementRoutingModule { }
