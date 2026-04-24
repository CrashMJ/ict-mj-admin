import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor( private toastr: ToastrService,private router: Router, private authService: AuthService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addAuthenticationToken(request);
        return next
            .handle(request)
            .pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/auth/login']);
                    this.toastr.warning('Authentication Failed!', 'Warning!')
                }
                return throwError(error);
            })
            )
    }

    addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            // setHeaders: {
            //     Authorization: "Bearer "+localStorage.getItem('currentClientAuthToken')
            // }
        });
    }
}