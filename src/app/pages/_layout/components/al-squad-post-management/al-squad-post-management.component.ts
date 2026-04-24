import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlSquadPostService } from './service/al-squad-post.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';

@Component({
  selector: 'app-al-squad-post-management',
  templateUrl: './al-squad-post-management.component.html',
  styleUrls: ['./al-squad-post-management.component.scss']
})
export class AlSquadPostManagementComponent implements OnInit {

  squadObj: any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','description','type','total_comments','total_likes','updated_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute, private alSquadPostService: AlSquadPostService,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

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
    this.alSquadPostService.getAllAlSquadPost(filter,limit,skip).subscribe((list:any) => {
      this.squadObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.squadObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  updateStandDetails(formData:any,id:any){
    this.alSquadPostService
    .updateStandDetails(formData, id)
    .subscribe((data:any) => {
      this.cdr.markForCheck();
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
    },
      err=>{
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      }
    );
   }

   updatePollDetails(formData:any,id:any){
    this.alSquadPostService
    .updatePollDetails(formData, id)
    .subscribe((data:any) => {
      this.cdr.markForCheck();
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
    },
      err=>{
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      }
    );
   }

  changeState(value:string, type:string, id:any){
    const formData = new FormData();
    formData.append('status',value);
    if(type=="POLL_POST"){
      this.updateStandDetails(formData,id);
    }else{
      this.updateStandDetails(formData,id);
    }
    console.log(value,type)
  }

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Squad Post';
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
