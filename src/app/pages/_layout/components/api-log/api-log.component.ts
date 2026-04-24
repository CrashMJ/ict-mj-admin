import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';import { ActivatedRoute } from '@angular/router';
import { PaymentLogService } from './services/log.service';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Debounce } from "lodash-decorators";

@Component({
  selector: 'app-api-log',
  templateUrl: './api-log.component.html',
  styleUrls: ['./api-log.component.scss']
})
export class ApiLogManagementComponent implements OnInit {
  tipObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','endPoint','requesterRole','studentName', 'requesterEmail','responseCode','created_at','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder,private route: ActivatedRoute, private paymentLogService: PaymentLogService,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData([],this.pagination_data.limit,0);
  }

  @Debounce(1000)
  search(key: string, value: any) {
    this.searchArray[key] = value;
    this.getData(
      this.searchArray,
      this.pagination_data.limit,
      this.pagination_data.pageIndex
    );
  }

  // search2(key:string,value: any) {
  //   const found = this.searchArray.find(element => Object.keys(element)[0] == key);
  //   if(found){
  //     this.searchArray.find(element => Object.keys(element)[0] == key)[key] = value;
  //   }else{
  //     var obj = {};
  //     obj[key]=value;
  //     this.searchArray.push(obj);
  //   }
	// 	this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex*this.pagination_data.limit);
	// }

  clearFilter(){
    this.searchArray =[];
    this.getData([],this.pagination_data.limit,0);
  }

  getData(filter:any,limit: number,skip: number){
    this.paymentLogService.getLogs(filter,limit,skip).subscribe((list:any) => {
      this.tipObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.tipObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
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
