import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { CouponService } from '../services/coupon.service';


@Injectable()
export class GetAllCouponResolver implements Resolve<any>{
    constructor(private couponService: CouponService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.couponService.getAllCoupon();
    }
}