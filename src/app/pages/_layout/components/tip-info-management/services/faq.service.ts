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
export class TipInfoService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getAllTips(limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      "keyword": "",
      "status": "",
      limit: limit,
      skip: skip,
      sort: "DESC",
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/faq/search",
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
    return this.http.get(this.URL + "/api/faq/" + id, options);
  }

  public saveTipAndInfoDetails(tipObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/faq/create",
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
        this.URL + "/api/faq/update/" + id,
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
        this.URL + "/api/faq/delete/hard/" + id,
        options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
