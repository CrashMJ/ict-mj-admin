import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SettingService } from './services/setting.service';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { SettingModalComponent } from './setting-modal/setting-modal.component';

@Component({
  selector: 'app-setting-management',
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.scss']
})
export class SettingManagementComponent implements OnInit {
  videoCommentObj: any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','slug','type','updated_at','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;
  searchArray:any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,
    public settingService: SettingService,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
    this.getData([],this.pagination_data.limit,0);
   }

  ngOnInit(): void {
   
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
		this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex);
	}

  clearFilter(){
    this.searchArray =[];
    this.getData([],this.pagination_data.limit,0);
  }

  getData(filter:any,limit: number,skip: number){
    this.settingService.getAllSetting(filter,limit,skip).subscribe((dataList:any) => {
      this.videoCommentObj = dataList.data.results;
      this.pagination_data.total = dataList.data.pagination.total;
      this.dataSource = this.videoCommentObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }


  delete(id:any,name:string){
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Setting';
    modalRef.componentInstance.title = name;
    

    modalRef.result.then(() =>
      this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex),
      () => { }
    );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex);
	}

  addNewSetting() {
    const modalRef = this.modalService.open(SettingModalComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      () => { }
    );
    // this.edit(1);
  }
}
