import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ReceiptService } from '../services/receipt.service';


@Injectable()
export class GetAllReceiptsResolver implements Resolve<any>{
    constructor(public receiptService: ReceiptService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.receiptService.getAllReceiptDetails();
    }
}