import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class LiveClassService {

    private URL = environment.BASE_DATA_URL;
    constructor(private http: HttpClient) { }

    public saveClassDetails(videoObj: any,teacherId: any) {
        let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
		});
		let options = { headers: headers };	
        return this.http.post<any>(this.URL + '/api/live-classes/admin/create/'+teacherId, videoObj, options);

    }

    public updateClassDetails(videoObj: any,classId: any) {
        let headers = new HttpHeaders({
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
		});
		let options = { headers: headers };	
        return this.http.put<any>(this.URL + '/api/live-classes/admin/update/'+classId, videoObj, options);

    }

    public updateClassDetails2(videoObj: any,classId: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
            "Access-Control-Allow-Origin": "*",
		});
		let options = { headers: headers };	
        return this.http.put<any>(this.URL + '/api/live-classes/admin/update/'+classId, videoObj, options);

    }

    public getAllLiveVideos(filter: any, limit: number, skip: number) {
        let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
        let data = {
            filter: filter,
            limit: limit,
            skip: skip,
            sort: "DESC",
          };
		let options = { headers: headers };	
        return this.http.post<any>(this.URL + '/api/live-classes/admin/search', data,options);
    }

    public getClassById(id:any){
        console.log(id);
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL+'/api/live-classes/admin/'+ id, options);
    }
}