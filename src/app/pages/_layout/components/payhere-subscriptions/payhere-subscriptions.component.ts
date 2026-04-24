import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PayhereSubscriptionService } from './services/payhereSubscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payhere-subscriptions',
  templateUrl: './payhere-subscriptions.component.html',
  styleUrls: ['./payhere-subscriptions.component.scss']
})
export class PayhereSubscriptionsComponent implements OnInit {

  vodSubsObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','payhere_amount','payment_id','method','item_rec_status','item_rec_install_paid','subscriptionId','created_at','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder,private route: ActivatedRoute, private payhereSubscriptionService: PayhereSubscriptionService,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData([],this.pagination_data.limit,0);
  }

  search(key:string,value: any) {
    const found = this.searchArray.find(element => Object.keys(element)[0] == key);
    if(found){
      this.searchArray.find(element => Object.keys(element)[0] == key)[key] = value;
    }else{
      var obj = {};
      obj[key]=value;
      this.searchArray.push(obj);
    }
		this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex*this.pagination_data.limit);
	}

  clearFilter(){
    this.searchArray =[];
    this.getData([],this.pagination_data.limit,0);
  }

  getData(filter:any,limit: number,skip: number){
    this.payhereSubscriptionService.getPayhereSubscription(filter,limit,skip).subscribe((list:any) => {
      this.vodSubsObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.vodSubsObj;

      this.cdr.markForCheck();
      console.log(this.pagination_data)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  
  pageEvent(event: any) {
    this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
  }
}
