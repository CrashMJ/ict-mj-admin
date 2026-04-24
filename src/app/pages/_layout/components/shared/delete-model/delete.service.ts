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
export class DeleteService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public deleteSubject(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/course/admin/delete/hard/" + id,
      options
    );
  }
  public deleteStudent(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/user/admin/delete/hard/" + id,
      options
    );
  }

  public deleteAssignment(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/assignment/admin/delete/" + id,
      {},
      options
    );
  }

  public deleteAdmin(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(this.URL + "/api/admin/" + id, options);
  }

  public deleteClass(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/class/admin/delete/soft/" + id,
      {},
      options
    );
  }

  public deleteMaterial(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/material/admin/delete/hard/" + id,
      options
    );
  }
  public deleteModule(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.put<any>(
      this.URL + "/api/module/admin/delete/soft/" + id,
      {},
      options
    );
  }

  public deleteOR(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/open-resources/admin/delete/" + id,
      options
    );
  }

  public deleteBanner(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/banner-management/delete/" + id,
      options
    );
  }

  public deleteTip(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/faq/delete/hard/" + id,
      options
    );
  }

  public deleteReview(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/testimonial/delete/" + id,
      options
    );
  }

  public deleteInq(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/inquiry/admin/delete/" + id,
      options
    );
  }

  public deleteContactus(id: any) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/contactus/delete/" + id,
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

  public deleteFreeCard(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/vod-subscriptions/free-cards/admin/delete/" + id,
      options
    );
  }

  public deleteMedal(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/ranking-medals/delete/" + id,
      options
    );
  }

  public deleteVideoComment(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/video/comments/delete/" + id,
      options
    );
  }

  public deleteSetting(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/settings/delete/" + id,
      options
    );
  }

  public deleteInstitute(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/institutes/delete/" + id,
      options
    );
  }

  public deleteCategory(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/after-al-categories/delete/" + id,
      options
    );
  }
  public deleteOptions(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/after-al-options/delete/" + id,
      options
    );
  }

  public deleteCampusContact(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/campus-contact/delete/" + id,
      options
    );
  }

  public deleteLiveClass(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/live-classes/admin/delete/" + id,
      options
    );
  }

  public deleteLiveEnrollement(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/live-enrolments/delete/" + id,
      options
    );
  }

  public deleteLivePurchase(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/live-class-purchases/delete/" + id,
      options
    );
  }

  public deleteSquadPost(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/squad-posts/delete/" + id,
      options
    );
  }
  public deleteSquadPostComment(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/squad-likes-comments/delete/" + id,
      options
    );
  }

  public deleteLesson(id: any) {
    console.log('deleteLesson final', id, localStorage.getItem("token"))
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    console.log('options final', options)

    return this.http.put<any>(
      this.URL + "/api/video-sell/admin/delete/soft/" + id,
      options
    );
  }
}
