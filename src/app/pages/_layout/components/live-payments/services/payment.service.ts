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
export class LivePaymentService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getPayments(filter: any, limit: number, skip: number) {
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
    return this.http.post(this.URL + "/api/live-class-purchases/search", data, options);
  }

  public getPaymentById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/live-class-purchases/'+id, options);
	}

  public editPayment(status: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      status: status,
    };
    if(status=='APPROVED'){
      return this.enrollStudent(id);
    }else{
      let options = { headers: headers };
      return this.http.put<any>(
        this.URL + "/api/live-class-purchases/update/" + id,
        data,
        options
      );
    }
    
  }

  public enrollStudent(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get<any>(
      this.URL + "/api/live-class-purchases/approve/" + id,
      options
    );
  }

  public deletePayment(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/live-class-purchases/delete/" + id,
      options
    );
  }
}
