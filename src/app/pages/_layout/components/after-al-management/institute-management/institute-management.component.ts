import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InstituteModalComponent } from './institute-modal/institute-modal.component';
import { DeleteModelComponent } from '../../shared/delete-model/delete-model.component';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { InstituteService } from './service/institute.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-institute-management',
  templateUrl: './institute-management.component.html',
  styleUrls: ['./institute-management.component.scss']
})
export class InstituteManagementComponent implements OnInit {

  caregoryObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','name','updated_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private route: ActivatedRoute,private instituteService: InstituteService,private modalService: NgbModal,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
    this.getData([],this.pagination_data.limit,0);
   }

  ngOnInit(): void {

  }

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Institute';
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
    this.instituteService.getAllInstitue(filter,limit,skip).subscribe((list:any) => {
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


  addNewInstitute(){
    const modalRef = this.modalService.open(InstituteModalComponent, { size: 'lg' });
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
