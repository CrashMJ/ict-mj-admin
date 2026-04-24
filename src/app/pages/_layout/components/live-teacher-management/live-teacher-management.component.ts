import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LiveTeacherService } from './services/live-teacher.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { districts } from 'src/config/districts.config';
import { SubjectService } from '../subject-management/services/subject.service';

@Component({
  selector: 'app-live-teacher-management',
  templateUrl: './live-teacher-management.component.html',
  styleUrls: ['./live-teacher-management.component.scss']
})
export class LiveTeacherManagementComponent implements OnInit {
  teacherObj: any;
  p: number = 1;
  subjectObj: any;
  displayedColumns: string[] = [ 'id','name','phone','subject','medium','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;
  districts = districts;
  searchArray:any =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cdr: ChangeDetectorRef,private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute, public liveTeacherService: LiveTeacherService,private toastr: ToastrService,
    private subjectService: SubjectService) { 
    this.getAdmins([],this.pagination_data.limit,0);
  }

  ngOnInit(): void {
    
    this.getSubjects([{"status": "ACTIVE"}],1000,0);
    this.route.data.subscribe(
      data => {
        this.teacherObj = data['teacherDetails'].data.results;
        console.log(data['teacherDetails'])

        console.log(this.teacherObj);
      }
    )
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
		this.getAdmins(this.searchArray,10,this.pagination_data.pageIndex*this.pagination_data.limit);
  }
  
  getSubjects(filter: any, limit: number, skip: number) {
    this.subjectService.getAllSubject(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.subjectObj = teacherList.data.results;
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  clearFilter(){
    this.searchArray =[];
    this.getAdmins([],this.pagination_data.limit,0);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }


  getAdmins(filter:any,limit: number,skip: number){
    this.liveTeacherService.getAllTeacher(filter,limit,skip).subscribe((teacherList:any) => {
      this.teacherObj = teacherList.data.results;
      this.pagination_data.total = teacherList.data.pagination.total;
      this.dataSource = this.teacherObj;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  delete(id:number,name:string){
    const modalRef = this.modalService.open(DeleteModelComponent, { size: 'lg' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = 'Live Teacher';
    modalRef.componentInstance.value = name;

    modalRef.result.then(() =>
    this.getAdmins(this.searchArray,this.pagination_data.limit,this.pagination_data.pageIndex * this.pagination_data.limit),
      () => { }
    );
  }

  pageEvent(event: any) {
		this.pagination_data.limit = event.pageSize;
		this.pagination_data.pageIndex = event.pageIndex;
		this.getAdmins(this.searchArray,event.pageSize,event.pageIndex*event.pageSize);
	}

}
