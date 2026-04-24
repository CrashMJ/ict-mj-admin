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
export class PaymentService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getPayments(filter: any, limit: number, skip: number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      id: filter && filter.payment_id ? filter.payment_id : null,
      course_id: filter && filter.course_id ? filter.course_id : null,
      student_id: filter && filter.student_id ? filter.student_id : null,
      phone: filter && filter.phone ? filter.phone : null,
      date_begin: filter && filter.date_begin ? filter.date_begin : "",
      date_end: filter && filter.date_end ? filter.date_end : "",
      payment_type: filter && filter.payment_type ? filter.payment_type : "",
      status: filter && filter.status ? filter.status : "",
      sort: "DESC",
      sort_field: "id",
      limit: limit,
      skip: skip,
    };
    let options = { headers: headers };
    return this.http.post(
      this.URL + "/api/class-payment/admin/filter",
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

  public createPay(formData: FormData) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/class-payment/admin/create",
      formData,
      options
    );
  }

  public editPayment(commission_eligibility: boolean, status: any,paid_date: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      commission_eligibility: commission_eligibility,
      status: status,
      paid_date: paid_date,
    };
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/bank-payment/admin/update/" + id,
      data,
      options
    );
  }

  public deletePayment(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/vod-purchases/delete/" + id,
      options
    );
  }
}
