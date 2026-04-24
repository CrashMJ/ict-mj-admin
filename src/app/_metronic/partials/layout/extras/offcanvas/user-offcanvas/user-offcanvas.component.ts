import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})
export class UserOffcanvasComponent implements OnInit {
  extrasUserOffcanvasDirection = 'offcanvas-right';
  userData;

  constructor(private layout: LayoutService, private auth: AuthService,private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
		  localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
		}
		this.userData = JSON.parse(localStorage.getItem("user")).data.admin;
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
}
