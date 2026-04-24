import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SubscriptionFreeCardService {
  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) {}

  public getSltSubscription(filter: any, limit: number, skip: number) {
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
    return this.http.post(
      this.URL + "/api/vod-subscriptions/free-cards/admin/search",
      data,
      options
    );
  }

  public getSltSubscriptionById(id: string | number) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.get(
      this.URL + "/api/vod-subscriptions/free-cards/admin/" + id,
      options
    );
  }

  public createVodSubscription(data: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/vod-subscriptions/free-cards/admin/create",
      data,
      options
    );
  }

  public editVodSubscription(status: any, number_of_months: any, id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let data = {
      status: status,
      number_of_months: number_of_months,
    };
    let options = { headers: headers };
    return this.http.post<any>(
      this.URL + "/api/vod-subscriptions/free-cards/admin/update/" + id,
      data,
      options
    );
  }

  public deleteVodSubscription(id: any) {
    let headers = new HttpHeaders({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let options = { headers: headers };
    return this.http.delete<any>(
      this.URL + "/api/vod-subscriptions/free-cards/admin/delete/" + id,
      options
    );
  }
}
