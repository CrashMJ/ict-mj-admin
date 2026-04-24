import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OptionModalComponent } from './option-modal/option-modal.component';
import { OptionService } from './service/option.service';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteModelComponent } from '../../shared/delete-model/delete-model.component';

@Component({
  selector: 'app-option-management',
  templateUrl: './option-management.component.html',
  styleUrls: ['./option-management.component.scss']
})
export class OptionManagementComponent implements OnInit {

  caregoryObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','after_al_category_id','institute_id','updated_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private route: ActivatedRoute,private optionService: OptionService,private modalService: NgbModal,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
    this.getData([],this.pagination_data.limit,0);
   }

  ngOnInit(): void {

  }

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Option';
    modalRef.componentInstance.value = name;

    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      // this.customerService.fetch(),
      () => { }
    );
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
    this.optionService.getAllOption(filter,limit,skip).subscribe((list:any) => {
      this.caregoryObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.caregoryObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }


  addNewOption(){
    const modalRef = this.modalService.open(OptionModalComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
    this.getData([],this.pagination_data.limit,0),
      () => { }
    );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
	}


}
