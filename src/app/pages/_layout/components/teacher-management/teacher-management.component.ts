import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TeacherModelComponent } from 'src/app/pages/_layout/components/teacher-management/teacher-model/teacher-model.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeleteModelComponent } from '../shared/delete-model/delete-model.component';
import { TeacherService } from './services/teacher.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from '../subject-management/services/subject.service';

@Component({
  selector: 'app-teacher-management',
  templateUrl: './teacher-management.component.html',
  styleUrls: ['./teacher-management.component.scss']
})
export class TeacherManagementComponent implements OnInit {
  teacherObj: any;
  p: number = 1;
  subjectObj: any;
  displayedColumns: string[] = [ 'id','name','email','subject','status','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cdr: ChangeDetectorRef,private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,  private subjectService: SubjectService, public teacherService: TeacherService,private toastr: ToastrService) { 
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

  clearFilter(){
    this.searchArray =[];
    this.getAdmins([],this.pagination_data.limit,0);
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
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  addNewAdmin() {
    const modalRef = this.modalService.open(TeacherModelComponent, { size: 'lg' });
    modalRef.result.then(() =>
      this.clearFilter(),
      () => {}
    );
  }

  getAdmins(filter:any,limit: number,skip: number){
    this.teacherService.getAllTeacher(filter,limit,skip).subscribe((teacherList:any) => {
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
    modalRef.componentInstance.type = 'Teacher';
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