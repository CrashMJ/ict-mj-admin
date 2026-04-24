import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { CampusContactUsService } from './service/campus-contactUs.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteModelComponent } from '../../shared/delete-model/delete-model.component';
import { OptionModalComponent } from '../option-management/option-modal/option-modal.component';
import { CampusContactModalComponent } from './campus-contact-modal/campus-contact-modal.component';

@Component({
  selector: 'app-campus-contact-us-management',
  templateUrl: './campus-contact-us-management.component.html',
  styleUrls: ['./campus-contact-us-management.component.scss']
})
export class CampusContactUsManagementComponent implements OnInit {

  
  caregoryObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','name','email','phone','after_al_category_id','updated_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private route: ActivatedRoute,private campusContactUsService: CampusContactUsService,private modalService: NgbModal,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
    this.getData([],this.pagination_data.limit,0);
   }

  ngOnInit(): void {

  }

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Campus Contact';
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
    this.campusContactUsService.getAllCampusContactUs(filter,limit,skip).subscribe((list:any) => {
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


  addNewCampusContact(){
    const modalRef = this.modalService.open(CampusContactModalComponent, { size: 'lg' });
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
