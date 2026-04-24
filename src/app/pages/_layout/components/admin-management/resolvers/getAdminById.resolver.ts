import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';

import { AdminManagementService } from '../services/admin.service';

@Injectable()
export class GetAdminByIdResolver implements Resolve<any>{
    param: string;
    sub:any;
    pageNum:any;
    constructor(private adminManagementService: AdminManagementService,private route: ActivatedRoute,private Activatedroute:ActivatedRoute,
        private router:Router) {
}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("asdfasdadafadsdadasda",route.data,this.route);
        return this.adminManagementService.getAdminById(1);
    }
}