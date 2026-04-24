import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponManagementComponent } from './coupon-management.component';
import { GetAllCouponResolver } from './resolvers/getAllCoupon.resolver';
import { EditCouponComponent } from './edit-coupon/edit-coupon.component';


const routes: Routes = [
  {
    path: '',
    component: CouponManagementComponent,
    resolve: {
      couponDetails: GetAllCouponResolver
    }

  },
  {
    path: 'edit/:id',
    component: EditCouponComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManagementRoutingModule { }
