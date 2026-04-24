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
export class LessonService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getAllLessons(filter: any, limit: number, skip: number) {
    console.log('filter',filter)
    console.log('filter status',filter.status)
    console.log('limit',limit)
    console.log('skip',skip)
    
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      keyword: filter.keyword ? filter.keyword : "",
      grade: filter.grade ? filter.grade : "",
      grade_type: filter.grade_type ? filter.grade_type : "",
      type: filter.type ? filter.type : "",
      status: filter.status ? filter.status : "",
      sort_field: "id",
      sort: "DESC",
      limit: limit,
      skip: skip,
    };
    console.log('data',data)
    let options = { headers: headers };
    return this.http.post<any>(this.URL + "/api/video-sell/search", data, options);
  }

  public getLessonById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(this.URL + "/api/video-sell/admin/" + id, options);
  }

  public getLessonGDriveId(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    const final = this.http.get(this.URL + "/api/video-buy/fieldId/get/" + id, options)
    console.log('FINAL', final)
    return final;
  }

  public createLesson(formData: FormData) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/video-sell/admin/create",
      formData,
      options
    );
  }

  public addVideoPackageLesson(mainLessonId: number, videoLessonData: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/video-sell/admin/videoPackage/add/"+mainLessonId,
      videoLessonData,
      options
    );
  }

  public removeVideoPackageLesson(packageId: number) {
    console.log('packageId',packageId)
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/video-sell/admin/videoPackage/remove/"+packageId,
      options
    );
  }

  public updateLessonDetails(id: number, lessonObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.put<any>(
      `${this.URL}/api/video-sell/admin/update/${id}`,
      lessonObj,
      options
    );
  }

  public updatePackagePaidType(id: number, paid_type: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.put<any>(
      `${this.URL}/api/video-sell/video-package/admin/update/${id}`,
      {paid_type},
      options
    );
  }

  public updateLessonImages(id: any, lessonObj: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/video-sell/admin/update/" + id,
      lessonObj,
      options
    );
  }

  public deleteLesson(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/video-sell/admin/delete/soft/" + id,
      options
    );
  }
}
