import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerModalComponent } from 'src/app/pages/_layout/components/banner-management/banner-modal/banner-modal.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../subject-management/services/subject.service';
import { environment } from 'src/environments/environment';
import { BannerService } from './services/banner.service';

@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.scss']
})
export class BannerManagementComponent implements OnInit {
  bannerObj:any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','type','description','url','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];
  
  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,private cdr: ChangeDetectorRef,private toastr: ToastrService,private bannerService: BannerService) { }

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
    this.bannerService.getAllBanner(filter,limit,skip).subscribe((list:any) => {
      this.bannerObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.bannerObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNewBanner() {
    const modalRef = this.modalService.open(BannerModalComponent, { size: 'lg' });
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
    modalRef.componentInstance.type = 'Banner';
    modalRef.componentInstance.value = name;

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
