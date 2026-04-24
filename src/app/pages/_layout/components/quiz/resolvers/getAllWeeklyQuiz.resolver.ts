import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { WeeklyQuizService } from '../services/weeklyQuiz.service';


@Injectable()
export class GetAllWeeklyQuizResolver implements Resolve<any>{
    constructor(private weeklyQuizService: WeeklyQuizService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let obj = {
            "filter": [

            ],
            "limit": 10,
            "skip": 0,
            "sort": "DESC"
        }
        // return this.weeklyQuizService.getAllWeeklyQuiz();
    }
}