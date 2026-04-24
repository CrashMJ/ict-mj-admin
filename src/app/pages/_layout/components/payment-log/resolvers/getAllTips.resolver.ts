import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { PaymentLogService } from '../services/payment-log.service';


@Injectable()
export class GetPaymentLogResolver implements Resolve<any>{
    constructor(private paymentLogService: PaymentLogService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.tipInfoService.getAllTips();
    }
}