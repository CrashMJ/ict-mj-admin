import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LiveClassService } from '../services/liveClass.service';

@Injectable()
export class GetAllLiveClassResolver implements Resolve<any>{
    constructor(private liveClassService: LiveClassService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.liveClassService.getAllLiveVideos();
    }
}