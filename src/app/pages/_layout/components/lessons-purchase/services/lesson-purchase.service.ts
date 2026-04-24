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
export class LessonPurchaseService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getAllLessonsPurchase(filter: any, limit: number, skip: number) {
    console.log('filter',filter)
    
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      id: filter.id ? filter.id : null,
      keyword: filter.keyword ? filter.keyword : "",
      user_id: filter.student_id ? filter.student_id : null,
      video_id: filter.video_id ? filter.video_id : null,
      status: filter.status ? filter.status : "",
      payment_status: filter.payment_status ? filter.payment_status : "",
      payment_type: filter.payment_type ? filter.payment_type : "",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    console.log('data',data)
    let options = { headers: headers };
    return this.http.post<any>(this.URL + "/api/video-buy/admin/filter", data, options);
  }

  public getLessonPurchaseById(id: string | number) {
    console.log('Enter getLessonPurchaseById', id)
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/video-buy/admin/" + id, options);
  }

  public updateLessonPurchaseDetails(lessonObj: any, id: any) {
    console.log('lessonObj',lessonObj, id)
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/video-buy/admin/update/" + id,
      lessonObj,
      options
    );
  }

  public updateLessonViewCount(lessonObj: any, id: any) {
    console.log('lessonObj',lessonObj, id)
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/video-buy/admin/update/viewCount/" + id,
      lessonObj,
      options
    );
  }

  public deleteLessonPurchase(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/video-buy/soft/delete/" + id,
      options
    );
  }

  public createLessonPurchase(formData: FormData) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/video-buy/admin/create",
      formData,
      options
    );
  }
}
