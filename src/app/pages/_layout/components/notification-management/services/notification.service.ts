import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
	providedIn: "root",
})
export class NotificationService {
	private _baseurl: string = environment.BASE_DATA_URL;

    constructor(private http: HttpClient) {}
	
	getAllNotification(filter:any,limit:number, skip:number,) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = {
			"keyword": "",
			"status": "",
			"limit": limit,
			"skip": skip,
			"sort":"DESC"
		};
		let options = { headers: headers };
		return this.http.post(this._baseurl+'/api/sms-notification/admin/search', data, options);
	}

	getNotificationById(id:any){
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this._baseurl+'/api/sms-notification/admin/'+ id, options);
	}

	public save(Obj: any) {
		let headers = new HttpHeaders({
		  Authorization: "Bearer " + localStorage.getItem("token"),
		});
		let options = { headers: headers };
		return this.http.post<any>(
		  this._baseurl + "/api/sms-notification/admin/create",
		  Obj,
		  options
		);
	  }
}
