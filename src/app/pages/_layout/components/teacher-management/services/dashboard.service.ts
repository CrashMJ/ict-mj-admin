import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VodDashboardService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  getVideoCount(dateRangeObj:any,teacherId: number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		const filter:any = dateRangeObj;
		filter.teacherId  = teacherId;
		return this.http.post(this.URL + '/api/video/admin/teacher/get-view-counts/',filter, options);
	}


}