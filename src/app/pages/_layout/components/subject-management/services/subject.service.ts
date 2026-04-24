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
export class SubjectService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getAllSubject(filter: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      keyword: "",
      class_grade: "",
      class_delivery_type: "",
      status: "active",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    let options = { headers: headers };
    return this.http.post<any>(this.URL + "/api/course/search", data, options);
  }

  getSubjectById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/course/admin/" + id, options);
  }

  saveSubjectDetails(subjectObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/course/admin/create", subjectObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateSubjectDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/course/admin/update/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  saveModuleDetails(subjectObj: FormData) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/module/admin/create", subjectObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  filterModule(course_id: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      course_id: course_id,
      status: "active",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/module/admin/filter", data, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getModuleDetailById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/module/" + id, options);
  }

  updateModuleDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/module/admin/update/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteModuleDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/module/admin/delete/soft/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }


  getClassDetailById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/class/admin/" + id, options);
  }

  saveClassDetails(subjectObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/class/admin/create", subjectObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  filterClass(course_id: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      keyword: "",
      course_id: course_id,
      module_id: null,
      status: "active",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/class/search", data, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  updateClassDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(this.URL + "/api/class/admin/update/" + id, subjectObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteClassDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/class/admin/delete/soft/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  saveMaterialDetails(subjectObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/material/admin/create", subjectObj, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  filterMaterial(course_id: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      course_id: course_id,
      type: "",
      keyword: "",
      status: "active",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    console.log(data);
    let options = { headers: headers };
    return this.http
      .post<any>(this.URL + "/api/material/search", data, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  getMaterialDetailById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/material/admin/" + id, options);
  }

  updateMaterialDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/material/admin/update/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  deleteMaterialDetails(subjectObj: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = subjectObj;
    console.log(data);
    let options = { headers: headers };
    return this.http
      .put<any>(
        this.URL + "/api/material/admin/delete/soft/" + id,
        subjectObj,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
