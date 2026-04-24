import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LiveTeacherService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public updateTeacherDetails(obj: FormData,id:number) {
    let headers = new HttpHeaders({
			// 'Content-Type': 'application/json',
	    'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
    let options = { headers: headers };
    return this.http.put(this.URL + '/api/teacher/admin/update/'+id, obj, options);

  }

  public getAllTeacher(filter:any,limit:number, skip:number,) {
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
    return this.http.post(this.URL + '/api/teacher/admin/search', data, options);

  }

  deleteTeacher(id: any) {
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.delete(this.URL + '/api/teacher/admin/'+id, options);
	}

  getTeacherById(id: any) {
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/teacher/admin/'+id, options);
	}
}