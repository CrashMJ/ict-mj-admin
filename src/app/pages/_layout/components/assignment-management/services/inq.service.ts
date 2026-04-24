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
export class InqService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getAllTips(filter:any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      "student_id": filter.student_id ? filter.student_id : null,
      "student_name": filter.student_name ? filter.student_name : "",
      "student_phone": filter.student_phone ? filter.student_phone : "",
      "course_id": filter.course_id ? filter.course_id : null,
      "module_id": filter.module_id ? filter.module_id :  null,
      "status": filter.status ? filter.status : "",
      "sort_field": "id",
      limit: limit,
      skip: skip,
      sort: "DESC",
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/assignment/admin/filter",
      data,
      options
    );
  }

  public getTipInfoById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/assignment/" + id, options);
  }

  public saveTipAndInfoDetails(tipObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/inquiry/admin/create",
      tipObj,
      options
    );
  }

  public uploadInqFile(tipObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/inquiry/admin/insert/csv",
      tipObj,
      options
    );
  }

  public editTipAndInfoDetails(studentObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = studentObj;
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/assignment/admin/stars/update/" + id,
        studentObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteFaq(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/inquiry/admin/delete/" + id,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
