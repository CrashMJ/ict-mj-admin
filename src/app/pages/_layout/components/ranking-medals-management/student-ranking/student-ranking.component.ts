import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DeleteModelComponent } from '../../shared/delete-model/delete-model.component';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RankingMedalService } from '../services/rankingMedal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-ranking',
  templateUrl: './student-ranking.component.html',
  styleUrls: ['./student-ranking.component.scss']
})
export class StudentRankingComponent implements OnInit {
  pagination_item_counts = environment.pagination_item_counts;
  pagination_data = environment.pagination_data;  
  dataSource:any=[];
  displayedColumns: string[] = [ 'id','name','email','phone','address','city','nic','updated_at','action']; //
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
    this.rankingMedalService.getStudentRanking().subscribe((list:any) => {
      
      console.log("adsaa",this.dataSource,list.data)
      this.rankingMedalObj = list.data;
      // this.pagination_data.total = list.data;
      this.dataSource = this.rankingMedalObj;

      this.cdr.markForCheck();
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
