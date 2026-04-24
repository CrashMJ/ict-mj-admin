import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
	providedIn: "root",
})
export class WeeklyQuizService {
	private _baseurl: string = environment.BASE_DATA_URL;

    constructor(private http: HttpClient) {}

    saveWeeklyQuizDetails(weeklyQuizObj:FormData){
        let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.post<any>(this._baseurl + '/api/weekly-quiz/create', weeklyQuizObj,options);
    }

	getAllWeeklyQuiz(filter:any,limit:number, skip:number,) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = {
			"filter": filter,
			"limit": limit,
			"skip": skip,
			"sort":"DESC"
		};
		let options = { headers: headers };
		return this.http.post(this._baseurl+'/api/weekly-quiz/search', data, options);
	}

	getWeeklyQuizById(id:any){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this._baseurl+'/api/weekly-quiz/'+ id, options);
	}

	updateWeeklyQuizDetails(weeklyQuizObj:FormData,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = weeklyQuizObj;
		console.log(data)
		let options = { headers: headers };	
		return this.http.put<any>(this._baseurl + '/api/weekly-quiz/update/'+id, weeklyQuizObj,options);
	}

	getAllStudentAnswers(filter: any,correct: any,limit: number, skip: number){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		let data = {
			"filter": filter,
			"relation_filters": [],
			"limit":limit,
			"skip": skip,
			"correct": correct,
			"sort":"DESC",
			"relations": [{"student": "tbl.student"}, {"question": "tbl.question"}]
		   };
		return this.http.post<any>(this._baseurl + '/api/weekly-quiz/admin/answers',data,options);
	}

	selectWinner(id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.get<any>(this._baseurl + '/api/weekly-quiz/select/winner/'+id,options);
	}
}
