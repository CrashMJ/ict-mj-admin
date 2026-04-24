import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class SettingService {

    private URL = environment.BASE_DATA_URL;
    constructor(private http: HttpClient) { }

    public saveSettingDetails(videoObj: any) {
        let headers = new HttpHeaders({
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
        let options = { headers: headers };
        return this.http.post<any>(this.URL + '/api/content/admin/create', videoObj,options);
    }

    public updateSettingDetails(obj: FormData,id:number) {
        let headers = new HttpHeaders({
            'Authorization': "Bearer "+ localStorage.getItem('token'),
            });
        let options = { headers: headers };
        return this.http.put(this.URL + '/api/content/admin/update/'+id, obj, options);
    
      }

    public getAllSetting(filter:any,limit:number, skip:number,) {
        let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
        let data = {
			"keyword": filter,
			"limit": limit,
			"skip": skip,
			"sort":"DESC"
		};
        let options = { headers: headers };
        return this.http.post<any>(this.URL + '/api/content/admin/search', data,options);
    }

    public getSettingById(id:any){

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL+'/api/content/'+ id, options);
    }
}