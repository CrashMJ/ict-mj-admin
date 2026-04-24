import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
	providedIn: "root",
})
export class AdminManagementService {
	private _baseurl: string = environment.BASE_DATA_URL;
	private getAdminListURL: string =
		this._baseurl + "/api/admin/search";
	private createUpdateAdminURL: string =
		this._baseurl + "/api/admin/create";
	private updateAdminURL: string =
		this._baseurl + "/api/admin/update/";
	private updateAdminPasswordURL: string =
		this._baseurl + "/api/admin/password/update";
	private deleteAdminURL: string =
		this._baseurl + "/api/admin/";
	private getAdminByIdURL: string =
		this._baseurl + "/api/admin/admin/";

	adsApproved: any;
	tempA: any;
	tempB: any;

	constructor(private http: HttpClient) {}

	createUpdateAdmin(formData: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization:
				"Bearer " + localStorage.getItem("token"),
		});
		let url = this.createUpdateAdminURL;
		let options = { headers: headers };
		let data = formData;
		data.id = data._id;
		delete data["_id"];
		return this.http.post(url, data, options);
	}

	updateAdmin(formData: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization:
				"Bearer " + localStorage.getItem("token"),
		});

		let data = formData;
		let url = this.updateAdminURL+data.id;
		let options = { headers: headers };

		return this.http.put(url, data, options);
	}

	updateAdminByAdmin(adminData: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization:
				"Bearer " + localStorage.getItem("token"),
		});

		let data = adminData;
		let url = this.getAdminByIdURL + data.id;
		let options = { headers: headers };

		return this.http.put(url, data, options);
	}

	updatePassword(formData: any) {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization:
				"Bearer " + localStorage.getItem("token"),
		});

		let data = formData;
		let url = this.updateAdminPasswordURL;
		let options = { headers: headers };

		return this.http.put(url, data, options);
	}

	getAdminById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let url = this.getAdminByIdURL+id;
		let options = { headers: headers };
		return this.http.get(url, options);
	}

	getAdminList(keyword:any,limit:number, skip:number,) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = {
			"keyword": keyword, 
			"status": "",
			"limit": limit,
			"skip": skip,
			"sort":"DESC"
		};
		let url = this.getAdminListURL;
		let options = { headers: headers };
		return this.http.post(url, data, options);
	}

	deleteAdmin(id: any) {
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let url = this.deleteAdminURL+parseInt(id);
		let options = { headers: headers };
		return this.http.delete(url, options);
	}

	saveAdminDetails(adminObj:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let data = adminObj;
		console.log(data)
		let options = { headers: headers };	
		let url = this.createUpdateAdminURL;
		return this.http.post<any>(url, adminObj,options).pipe(
			catchError((error: HttpErrorResponse) => {
				return throwError(error);
			  }));
	}

}
