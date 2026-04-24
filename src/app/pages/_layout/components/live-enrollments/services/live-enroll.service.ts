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
export class LiveEnrollService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getVodEnroll(filter: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      filter: filter,
      limit: limit,
      skip: skip,
      sort: "DESC",
    };
    let options = { headers: headers };
    return this.http.post(this.URL + "/api/live-enrolments/search", data, options);
  }

  public getVodEnrollById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/live-enrolments/'+id, options);
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
      this.URL + "/api/live-enrolments/update/" + id,
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
      this.URL + "/api/live-enrolments/delete/" + id,
      options
    );
  }
}
