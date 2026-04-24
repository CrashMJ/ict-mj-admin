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
      "keyword": filter.keyword ? filter.keyword : "",
      "status": filter.status ? filter.status :  "",
      "exam_year": filter.exam_year ? filter.exam_year : null,
      "class_grade": filter.class_grade ? filter.class_grade : "",
      limit: limit,
      skip: skip,
      sort: "DESC",
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/inquiry/admin/search",
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
    return this.http.get(this.URL + "/api/inquiry/admin/get/" + id, options);
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
        this.URL + "/api/inquiry/admin/update/" + id,
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
