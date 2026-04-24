import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class VideoCommentService {

    private URL = environment.BASE_DATA_URL;
    constructor(private http: HttpClient) { }

    public updateVideoStatus(status:any,id:number) {
        let headers = new HttpHeaders({
            'Authorization': "Bearer "+ localStorage.getItem('token'),
            });
        let options = { headers: headers };
        return this.http.put(this.URL + '/api/video/comments/update/'+id, status, options);
    
      }

    public getAllVideoComments(filter:any,limit:number, skip:number,) {
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
        return this.http.post<any>(this.URL + '/api/video/comments/admin/search', data,options);
    }

}