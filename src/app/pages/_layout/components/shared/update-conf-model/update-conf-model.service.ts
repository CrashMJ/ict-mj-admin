import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UpdateConfService {

    private URL = environment.BASE_DATA_URL;
    constructor(private http: HttpClient) { }

    public updateWinner(id: any) {
        let headers = new HttpHeaders({
			'Authorization': "Bearer "+ localStorage.getItem('token'),
		});
		let options = { headers: headers };	
		return this.http.get<any>(this.URL + '/api/weekly-quiz/select/winner/'+id,options);
    }
}