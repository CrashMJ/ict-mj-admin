import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionFreeCardService } from './services/subscription-free-cards.service';
import { ToastrService } from 'ngx-toastr';
import { CreateFreeCardModalComponent } from './create/create-modal.component';

@Component({
  selector: 'app-subscription-free-cards',
  templateUrl: './subscription-free-cards.component.html',
  styleUrls: ['./subscription-free-cards.component.scss']
})
export class SubscriptionFreeCardComponent implements OnInit {

  vodSubsObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','student_id','student','teacher_id','teacher','created_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder,private route: ActivatedRoute, private subscriptionFreeCardService: SubscriptionFreeCardService,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

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
    this.subscriptionFreeCardService.getSltSubscription(filter,limit,skip).subscribe((list:any) => {
      this.vodSubsObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.vodSubsObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNew(){
    const modalRef = this.modalService.open(CreateFreeCardModalComponent, { size: 'md' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
    this.getData([],this.pagination_data.limit,0),
      () => { }
    );
  }

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Free Card';
    modalRef.componentInstance.value = name+"'s";
    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      () => { }
    );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
	}

}
