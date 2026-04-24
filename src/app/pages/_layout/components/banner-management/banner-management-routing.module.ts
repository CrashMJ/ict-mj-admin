import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerManagementComponent } from 'src/app/pages/_layout/components/banner-management/banner-management.component';
import { EditBannerComponent } from 'src/app/pages/_layout/components/banner-management/edit-banner/edit-banner.component';
import { GetAllBannerResolver } from './resolvers/getAllBanner.resolver';

const routes: Routes = [
  {
    path: '',
    component: BannerManagementComponent,
    resolve: {
      bannerDetails: GetAllBannerResolver
    }


  },
  {
    path: 'edit/:id',
    component: EditBannerComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerManagementRoutingModule { }
