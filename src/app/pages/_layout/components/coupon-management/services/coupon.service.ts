import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public saveCouponDetails(studentObj: any) {
	let headers = new HttpHeaders({
		'Authorization': "Bearer "+ localStorage.getItem('token'),
	});
	let options = { headers: headers };	
    return this.http.post<any>(this.URL + '/api/couponcodes/create', studentObj,options);
  }

  public getAllCoupon(filter:any,limit:number, skip:number,) {
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
    return this.http.post<any>(this.URL + '/api/couponcodes/admin/search', data,options);

  }

  getCouponById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/couponcodes/'+id, options);
	}

	updateCouponDetails(studentObj:any,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.put<any>(this.URL + '/api/couponcodes/update/'+id, studentObj,options);
	}

}