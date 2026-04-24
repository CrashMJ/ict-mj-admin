import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OptionService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public saveOptionDetails(studentObj: any) {
	let headers = new HttpHeaders({
		'Authorization': "Bearer "+ localStorage.getItem('token'),
		"Access-Control-Allow-Origin": "*",
	});
	let options = { headers: headers };
	console.log(JSON.stringify(studentObj))	
    return this.http.post<any>(this.URL + '/api/after-al-options/create', studentObj,options);
  }

  public getAllOption(filter:any,limit:number, skip:number,) {
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
    return this.http.post<any>(this.URL + '/api/after-al-options/admin/search', data,options);

  }

  getOptionById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/after-al-options/'+id, options);
	}

	updateOptionDetails(studentObj:any,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.put<any>(this.URL + '/api/after-al-options/update/'+id, studentObj,options);
	}

}