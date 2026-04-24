import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { StudentService } from 'src/app/pages/_layout/components/student-management/services/student.service';


@Injectable()
export class GetAllStudentResolver implements Resolve<any>{
    constructor(private studentService: StudentService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.studentService.getAllStudent();
    }
}