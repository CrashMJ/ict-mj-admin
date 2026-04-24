import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../../../core';
import { UserModel } from '../../../../../../modules/auth/_models/user.model';
import { AuthService } from '../../../../../../modules/auth/_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})
export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle = 'dark';
  userData: any;

  constructor(private layout: LayoutService, private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    // this.extrasUserDropdownStyle = this.layout.getProp(
    //   'extras.user.dropdown.style'
    // );
    if (localStorage.getItem("user") === null) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
		}
		this.userData = JSON.parse(localStorage.getItem("user")).data.admin;
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
