import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RankingMedalModalComponent } from './ranking-medal-modal/ranking-medal-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { RankingMedalService } from './services/rankingMedal.service';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ranking-medals-management',
  templateUrl: './ranking-medals-management.component.html',
  styleUrls: ['./ranking-medals-management.component.scss']
})
export class RankingMedalsManagementComponent implements OnInit {

  pagination_item_counts = environment.pagination_item_counts;
  pagination_data = environment.pagination_data;  
  dataSource:any=[];
  displayedColumns: string[] = [ 'id','name','views','updated_at','action']; //
  rankingMedalObj: any;
  searchArray:any =[];

  constructor(private modalService: NgbModal, public rankingMedalService:RankingMedalService,private cdr: ChangeDetectorRef,private toastr: ToastrService) { }

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
    this.rankingMedalService.getAllMedals(filter,limit,skip).subscribe((list:any) => {
      this.rankingMedalObj = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.rankingMedalObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNewMedal(){
    const modalRef = this.modalService.open(RankingMedalModalComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    // modalRef.result.then(() =>
    // this.getData([],this.pagination_data.limit,0),
    //   () => { }
    // );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getData(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
  }
  

  delete(id:any,name:string){
    console.log("delete")
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Medal';
    modalRef.componentInstance.value = name;
    
    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      // this.customerService.fetch(),
      () => { }
    );
  }
}
