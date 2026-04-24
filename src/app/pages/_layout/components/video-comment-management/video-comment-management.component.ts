import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VideoCommentService } from './services/videoComment.service';

@Component({
  selector: 'app-video-comment-management',
  templateUrl: './video-comment-management.component.html',
  styleUrls: ['./video-comment-management.component.scss']
})
export class VideoCommentManagementComponent implements OnInit {
  videoCommentObj: any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','comment','video','updated_at','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;
  searchArray:any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,
    public videoCommentService: VideoCommentService,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
    this.getData([],this.pagination_data.limit,0);
   }

  ngOnInit(): void {
   
    // this.route.data.subscribe(
    //   data => {
    //     this.videoObj = data['videoDetails'].data.results;
    //     console.log(data['videoDetails'])

    //     console.log(this.videoObj);
    //   }
    // )
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
    this.videoCommentService.getAllVideoComments(filter,limit,skip).subscribe((dataList:any) => {
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
    modalRef.componentInstance.type = 'Video Comment';
    modalRef.componentInstance.title = name;
    

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

  statusChange(status:any,id:any){
    let val= {
      "status": status
    }
    this.videoCommentService.updateVideoStatus(val,id).subscribe((dataList:any) => {
     if(dataList.statusCode == 200)
     {
       this.toastr.success("Status Changed successfully");
     }
     else{
      this.toastr.error("Error in status change");
     }
     
		this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex*this.pagination_data.limit);
    },
    (error) => {
      this.toastr.error("oops Somthing went wrong!");
    })
  }
}
