import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heading1: string = 'VOD Summary';
  heading2: string = 'Live Summary';
  heading3: string = 'Monthly Summary';
  heading4: string = 'Total Registrations';
  amount1: string = 'Students registered: 978';
  amount2: string = 'Teachers registered: 108';
  contentObject1: any = {
    heading1: 'Total Teachers',
    heading2: 'Total Lessons',
    heading3: 'Total Earning',
    amount1: '28',
    amount2: '169',
    amount3: 'LKR 350,000.00'
  }
  contentObject2: any = {
    heading1: 'Total Teachers',
    heading2: 'Total Classes today',
    heading3: 'Total Attendance ',
    amount1: '28',
    amount2: '5',
    amount3: '47'
  }
  contentObject3: any = {
    heading1: 'Teachers',
    heading2: 'Lessons',
    heading3: 'Earning',
    amount1: '40',
    amount2: '869',
    amount3: 'LKR 970,000.00'
  }
  constructor() { }

  ngOnInit(): void {
  }


  create() {
    console.log("adsadadsadada")
    // this.edit(1);
  }
}
