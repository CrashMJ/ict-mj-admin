import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { VideoService } from 'src/app/pages/_layout/components/video-management/services/video.service';


@Injectable()
export class GetAllVideoResolver implements Resolve<any>{
    constructor(private videoService: VideoService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.videoService.getAllVideos(obj);
    }
}