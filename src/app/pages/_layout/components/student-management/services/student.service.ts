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
export class StudentService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public saveStudenDetails(studentObj: FormData) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = studentObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/student/register", studentObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  public getAllStudent(filter: any, limit: number, skip: number) {
    console.log(filter);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      id: filter && filter.id ? filter.id : "",
      name: filter && filter.name ? filter.name : "",
      school: "",
      gender: "",
      nic: filter && filter.nic ? filter.nic : "",
      email: filter && filter.email ? filter.email : "",
      phone: filter && filter.phone ? filter.phone : "",
      class_grade: "",
      class_type: "",
      account_type: "",
      registered_date: "",
      status: filter && filter.status ? filter.status : "",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/user/admin/filter",
      data,
      options
    );
  }

  getStudentById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/user/admin/" + id, options);
  }

  updateStudentDetails(studentObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http
      .put<any>(this.URL + "/api/user/admin/update/" + id, studentObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateStudentPassword(studentObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http
      .post<any>(
        this.URL + "/api/user/admin/password-reset/" + id,
        studentObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  public getStudentDevices(id: any, limit: number, skip: number) {
    console.log('getStudentDevices', id);
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      id: id,
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/user/admin/filter/devices",
      data,
      options
    );
  }
}
