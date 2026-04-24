import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CampusContactUsService {

  private URL = environment.BASE_DATA_URL;
  constructor(private http: HttpClient) { }

  public getAllCampusContactUs(filter:any,limit:number, skip:number,) {
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
    return this.http.post<any>(this.URL + '/api/campus-contact/search', data,options);

  }

  getCampusContactUsById(id: string | number) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
	        'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };
		return this.http.get(this.URL + '/api/campus-contact/'+id, options);
	}

    public saveCampusContactUsDetails(studentObj: any) {
        let headers = new HttpHeaders({
            'Authorization': "Bearer "+ localStorage.getItem('token'),
        });
        let options = { headers: headers };	
        return this.http.post<any>(this.URL + '/api/campus-contact/create', studentObj,options);
      }

      updateCampusContactUsDetails(studentObj:any,id:any){
		let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.put<any>(this.URL + '/api/campus-contact/update/'+id, studentObj,options);
	}

}