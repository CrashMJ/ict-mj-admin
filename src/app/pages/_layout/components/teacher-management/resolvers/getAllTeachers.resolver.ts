import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { TeacherService } from 'src/app/pages/_layout/components/teacher-management/services/teacher.service';


@Injectable()
export class GetAllTeacherResolver implements Resolve<any>{
    constructor(private teacherService: TeacherService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        return this.teacherService.getAllTeacher([],10,0);
    }
}