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
export class PaymentLogService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getLogs(filter: any, limit: number, skip: number) {
    console.log('limit skip', limit, skip)
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      requesterId: filter && filter.requesterId ? filter.requesterId : null,
      requestParamId: filter && filter.requestParamId ? filter.requestParamId : null,
      requesterRole: filter && filter.requesterRole ? filter.requesterRole : "",
      requesterEmail: filter && filter.requesterEmail ? filter.requesterEmail : "",
      responseCode: filter && filter.responseCode ? filter.responseCode : null,
      userId: filter && filter.userId ? filter.userId : null,
      userName: filter && filter.userName ? filter.userName : "",
      filter: filter,
      limit: limit,
      skip: skip,
      sort_field: "id",
      sort: "DESC",
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/api-log/admin/filter",
      data,
      options
    );
  }

  public getPaymentById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/api-log/admin/get/" + id, options);
  }
}
