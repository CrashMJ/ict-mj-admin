import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public getAllBanner(filter:any,limit:number, skip:number,) {
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
    return this.http.post<any>(this.URL + '/api/banner-management/search',data,options);

  }


  getBannerById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/banner-management/'+id, options);
	}

	saveBannerDetails(subjectObj:FormData){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = subjectObj;
		console.log(data)
		let options = { headers: headers };	
		return this.http.post<any>(this.URL + '/api/banner-management/create', subjectObj,options).pipe(
			catchError((error: HttpErrorResponse) => {
				return throwError(error);
			  }));
	}

	editBannerDetails(subjectObj:any,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = subjectObj;
		console.log(data)
		let options = { headers: headers };	
		return this.http.put<any>(this.URL + '/api/banner-management/update/'+id, subjectObj,options).pipe(
			catchError((error: HttpErrorResponse) => {
				return throwError(error);
			  }));
	}
}