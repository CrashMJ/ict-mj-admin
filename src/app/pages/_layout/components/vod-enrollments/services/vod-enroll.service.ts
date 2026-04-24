import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VodEnrollService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getVodEnroll(filter: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      "keyword": filter.keyword ? filter.keyword : "",
      "course_id": filter?.course_id && filter?.course_id !== '' ? Number(filter.course_id) :null,
      "student_id": filter?.student_id && filter?.student_id !== '' ? Number(filter.student_id) :null,
      "payment_id": filter?.payment_id && filter?.payment_id !== '' ? Number(filter.payment_id) :null,
      "date_begin": filter?.date_begin ? filter.date_begin :"",
      "date_end": filter?.date_end ? filter.date_end :"",
      "payment_status": filter?.payment_status ? filter.payment_status :"",
      "status": filter?.status ? filter.status :"",
      "sort": "DESC",
      "sort_field": "id",
      "limit": limit,
      "skip": skip
  };
    let options = { headers: headers };
    return this.http.post(this.URL + "/api/enrollment/admin/filter", data, options);
  }

  public getVodEnrollById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/enrollment/admin/'+id, options);
	}

  public getVodEnrolledStudentsById(filter: any, limit: number, skip: number,id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
    let data = {
      filter: filter,
      limit: limit,
      skip: skip,
      sort: "DESC",
    };
		let options = { headers: headers };
		return this.http.post(this.URL + '/api/vod-enrolments/students/'+id,data, options);
	}

  public editVodEnroll(status: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      status: status,
    };
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/enrollment/admin/update/" + id,
      data,
      options
    );
  }

  public deleteVodEnroll(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/enrollment/admin/delete/" + id,
      options
    );
  }
}
