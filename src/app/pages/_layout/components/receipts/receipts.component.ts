import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { ReceiptsModalComponent } from './receipts-modal/receipts-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReceiptService } from './services/receipt.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  
  receiptObj: any;
  p: number = 1;
  
  displayedColumns: string[] = [ 'id','reference_number','student_name','phone','teleshop_bank','type','created_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,private cdr: ChangeDetectorRef,private toastr: ToastrService,public receiptService: ReceiptService) { }

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
    this.receiptService.getAllReceiptDetails(filter,limit,skip).subscribe((teacherList:any) => {
      this.receiptObj = teacherList.data.results;
      this.pagination_data.total = teacherList.data.pagination.total;
      this.dataSource = this.receiptObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNewStudent() {
    const modalRef = this.modalService.open(ReceiptsModalComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
    this.getData([],this.pagination_data.limit,0),
      () => { }
    );
    // this.edit(1);
  }


  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Receipt';
    modalRef.componentInstance.value = name;

    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      // this.customerService.fetch(),
      () => { }
    );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
	}

}
