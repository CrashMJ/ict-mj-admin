import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AdminManagementService } from '../services/admin.service';

@Injectable()
export class GetAllAdminResolver implements Resolve<any>{
    constructor(private adminManagementService: AdminManagementService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.adminManagementService.getAdminList();
    }
}