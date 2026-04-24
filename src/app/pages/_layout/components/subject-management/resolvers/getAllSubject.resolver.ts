import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { SubjectService } from '../services/subject.service';


@Injectable()
export class GetAllSubjectResolver implements Resolve<any>{
    constructor(private subjectService: SubjectService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // let obj = {
        //     "filter": [

        //     ],
        //     "limit": 10,
        //     "skip": 0,
        //     "sort": "DESC"
        // }
        // return this.subjectService.getAllSubject();
    }
}