import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-total-registration',
  templateUrl: './total-registration.component.html',
  styleUrls: ['./total-registration.component.scss']
})
export class TotalRegistrationComponent implements OnInit {
  @Input() title: string;
  @Input() amount: string;
  constructor() { }

  ngOnInit(): void {
  }

}
