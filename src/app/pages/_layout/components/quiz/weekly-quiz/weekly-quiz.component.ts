import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WeeklyQuizModelComponent } from 'src/app/pages/_layout/components/quiz/weekly-quiz-model/weekly-quiz-model.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeleteModelComponent } from '../../shared/delete-model/delete-model.component';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { WeeklyQuizService } from '../services/weeklyQuiz.service';

@Component({
  selector: 'app-weekly-quiz',
  templateUrl: './weekly-quiz.component.html',
  styleUrls: ['./weekly-quiz.component.scss']
})
export class WeeklyQuizComponent implements OnInit {
  weeklyQuiz: any;
  p: number = 1;
  
  displayedColumns: string[] = [ 'id','question','sponsor_web_url','status','created_at','action'];
  dataSource:any;
  pagination_item_counts = environment.pagination_item_counts;
	pagination_data = environment.pagination_data;

  searchArray:any =[];

  constructor(private modalService: NgbModal, private fb: FormBuilder, private route: ActivatedRoute,private cdr: ChangeDetectorRef,private toastr: ToastrService,private weeklyQuizService: WeeklyQuizService) { }

  ngOnInit(): void {
    this.getData([],this.pagination_data.limit,0)
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
    this.weeklyQuizService.getAllWeeklyQuiz(filter,limit,skip).subscribe((list:any) => {
      this.weeklyQuiz = list.data.results;
      this.pagination_data.total = list.data.pagination.total;
      this.dataSource = this.weeklyQuiz;

      this.cdr.markForCheck();
      console.log(this.dataSource)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  addNewQuiz() {
    const modalRef = this.modalService.open(WeeklyQuizModelComponent, { size: 'lg' });
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
    modalRef.componentInstance.type = 'Weekly Quiz';
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
