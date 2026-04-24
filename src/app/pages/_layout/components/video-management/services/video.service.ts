import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class VideoService {

    private URL = environment.BASE_DATA_URL;
    constructor(private http: HttpClient) { }

    public saveVideoDetails(videoObj: any) {
        let headers = new HttpHeaders({
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
        let options = { headers: headers };
        return this.http.post<any>(this.URL + '/api/video/create', videoObj,options);
    }

    public updateVideoDetails(obj: FormData,id:number) {
        let headers = new HttpHeaders({
            'Authorization': "Bearer "+ localStorage.getItem('token'),
            });
        let options = { headers: headers };
        return this.http.put(this.URL + '/api/video/update/'+id, obj, options);
    
      }

    public getAllVideos(filter:any,limit:number, skip:number,) {
        let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
        let data = {
			"filter": filter,
			"limit": limit,
			"skip": skip,
			"sort":"DESC"
		};
        let options = { headers: headers };
        return this.http.post<any>(this.URL + '/api/video/search', data,options);
    }

    public getVideoById(id:any){

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL+'/api/video/'+ id, options);
    }

    deleteVideo(id: any) {
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.delete(this.URL + '/api/video/delete/'+id, options);
	}
}