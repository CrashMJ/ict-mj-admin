import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { BannerService } from '../services/banner.service';


@Injectable()
export class GetAllBannerResolver implements Resolve<any>{
    constructor(private bannerService: BannerService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.bannerService.getAllBanner();
    }
}