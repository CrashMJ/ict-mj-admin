import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AlSquadPostService {

	private URL = environment.BASE_DATA_URL;
	constructor(private http: HttpClient) { }
  
	public getAllAlSquadPost(filter:any,limit:number, skip:number,) {
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
	  return this.http.post<any>(this.URL + '/api/squad-posts/admin/search', data,options);
  
	}
  
	public getAllComments(filter:any,limit:number, skip:number,) {
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
		return this.http.post<any>(this.URL + '/api/squad-likes-comments/search', data,options);
	
	  }
	

	  getPollById(id: string | number) {
		  let headers = new HttpHeaders({
			  'Content-Type': 'application/json',
			  'Authorization': "Bearer "+ localStorage.getItem('token'),
		  });
		  let options = { headers: headers };
		  return this.http.get(this.URL + '/api/squad-posts/admin/'+id, options);
	  }
  
	  public saveCampusContactUsDetails(studentObj: any) {
		  let headers = new HttpHeaders({
			  'Authorization': "Bearer "+ localStorage.getItem('token'),
		  });
		  let options = { headers: headers };	
		  return this.http.post<any>(this.URL + '/api/campus-contact/create', studentObj,options);
		}
  
		updatePollDetails(Obj:any,id:any){
		  let headers = new HttpHeaders({
			  'Authorization': "Bearer "+ localStorage.getItem('token'),
		  });
		  let options = { headers: headers };	
		  return this.http.put<any>(this.URL + '/api/squad-posts/update/poll/'+id, Obj,options);
	  }

	  updateStandDetails(Obj:any,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.put<any>(this.URL + '/api/squad-posts/update/standard/'+id, Obj,options);
	}
  
}