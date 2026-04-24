import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { VideoModelComponent } from 'src/app/pages/_layout/components/video-management/video-model/video-model.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { VideoService } from './services/video.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-video-management',
  templateUrl: './video-management.component.html',
  styleUrls: ['./video-management.component.scss']
})
export class VideoManagementComponent implements OnInit {
  videoObj: any;
  p: number = 1;

  displayedColumns: string[] = [ 'id','video_code','title','teacher','price','grade','subject','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;
  searchArray:any =[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,public videoService: VideoService,private cdr: ChangeDetectorRef,private toastr: ToastrService) {
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
    this.videoService.getAllVideos(filter,limit,skip).subscribe((dataList:any) => {
      this.videoObj = dataList.data.results;
      this.pagination_data.total = dataList.data.pagination.total;
      this.dataSource = this.videoObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNewVideo() {
    const modalRef = this.modalService.open(VideoModelComponent, { size: 'lg' });
    // modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
    this.getData(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      () => { }
    );
    // this.edit(1);
  }


  delete(id:any,name:string){
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Video';
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
}
