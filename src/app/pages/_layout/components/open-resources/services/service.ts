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
export class ORService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getList(filter: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      class_type: filter && filter.class_type ? filter.class_type : "",
      grade: filter && filter.grade ? filter.grade : "",
      medium: filter && filter.medium ? filter.medium : "",
      type: filter && filter.type ? filter.type : "",
      sort: "DESC",
      sort_field: "id",
      limit: limit,
      skip: skip,
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/open-resources/filter",
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
    return this.http.get(this.URL + "/api/class-payment/admin/" + id, options);
  }

  public create(formData: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/open-resources/admin/create",
      formData,
      options
    );
  }

  public edit(status: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      status: status,
    };
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/bank-payment/admin/update/" + id,
      data,
      options
    );
  }

  public delete(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/open-resources/admin/delete/" + id,
      options
    );
  }
}
