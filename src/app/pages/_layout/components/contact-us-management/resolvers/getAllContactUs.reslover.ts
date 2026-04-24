import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReceiptService } from '../../receipts/services/receipt.service';


@Injectable()
export class GetAllContactUsResolver implements Resolve<any>{
    constructor(public receiptService: ReceiptService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.receiptService.getAllReceiptDetails();
    }
}