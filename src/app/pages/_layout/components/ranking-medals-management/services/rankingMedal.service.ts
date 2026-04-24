import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankingMedalService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public saveRankingMedalDetails(medalObj: FormData) {
	let headers = new HttpHeaders({
		'Authorization': "Bearer "+ localStorage.getItem('token'),
	});
	let data = medalObj;
	console.log(data)
	let options = { headers: headers };	
    return this.http.post<any>(this.URL + '/api/ranking-medals/create', medalObj,options).pipe(
		catchError((error: HttpErrorResponse) => {
			return throwError(error);
		  }));

  }

  public getAllMedals(filter:any,limit:number, skip:number,) {
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
    return this.http.post<any>(this.URL + '/api/ranking-medals/search', data,options);

  }
  

  updateMedalDetails(studentObj:any,id:any){
	let headers = new HttpHeaders({
		'Authorization': "Bearer "+ localStorage.getItem('token'),
	});
	let data = studentObj;
	console.log(data)
	let options = { headers: headers };	
	return this.http.put<any>(this.URL + '/api/ranking-medals/update/'+id, studentObj,options).pipe(
		catchError((error: HttpErrorResponse) => {
			return throwError(error);
		  }));
}
 
getMedalById(id: string | number) {
	let headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': "Bearer "+ localStorage.getItem('token'),
	});
	let options = { headers: headers };
	return this.http.get(this.URL + '/api/ranking-medals/'+id, options);
}

public getStudentRanking() {
    let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		// let data = {
		// 	"filter": filter,
		// 	"limit": limit,
		// 	"skip": skip,
		// 	"sort":"DESC"
		// };
		let options = { headers: headers };	
    return this.http.get(this.URL + '/api/student/rankings/current',options);

  }
}