import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth';
import { ActivatedRoute } from '@angular/router';
import { WeeklyQuizService } from '../services/weeklyQuiz.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateConfModelComponent } from '../../shared/update-conf-model/update-conf-model.component';

@Component({
  selector: 'app-edit-weekly-quiz',
  templateUrl: './edit-weekly-quiz.component.html',
  styleUrls: ['./edit-weekly-quiz.component.scss']
})
export class EditWeeklyQuizComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  user: UserModel;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  id: any;
  fileToUpload: File = null;
  weeklyQuizResponse: any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  displayedColumns2: string[] = [ 'id','video_id','student_id','name','email','phone','created_at'];
  dataSource2:any;
  pagination_item_counts2 = environment.pagination_item_counts;
	pagination_data2 = environment.pagination_data;
  allStudentAnswerResponse:any;

  displayedColumns3: string[] = [ 'id','video_id','student_id','name','email','phone','created_at','action'];
  dataSource3:any;
  pagination_item_counts3 = environment.pagination_item_counts;
	pagination_data3 = environment.pagination_data;
  allStudentCorrectAnswerResponse:any;
  
  constructor(private modalService: NgbModal,private layout: LayoutService, private el: ElementRef, private fb: FormBuilder, private route: ActivatedRoute,
    public weeklyQuizService: WeeklyQuizService,
    private toastr: ToastrService,private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      redirectUrl: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.formGroup2 = this.fb.group({
      sponsor_banner: ['', Validators.required],
    });
    this.formGroup3 = this.fb.group({
      status: ['', Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.weeklyQuizService.getWeeklyQuizById(this.id).subscribe((data:any) => {
      this.weeklyQuizResponse = data.data;
      this.formGroup.get('question').setValue( this.weeklyQuizResponse.question);
      this.formGroup.get('answer1').setValue( this.weeklyQuizResponse.answers[0].answer);
      this.formGroup.get('answer2').setValue( this.weeklyQuizResponse.answers[1].answer);
      this.formGroup.get('answer3').setValue( this.weeklyQuizResponse.answers[2].answer);
      this.formGroup.get('answer4').setValue( this.weeklyQuizResponse.answers[3] ? this.weeklyQuizResponse.answers[3].answer : "");
      this.formGroup.get('redirectUrl').setValue( this.weeklyQuizResponse.sponsor_web_url);
      this.formGroup.get('status').setValue( this.weeklyQuizResponse.status);
      this.getAllAnswers([{"questionId":this.id}],null,this.pagination_data2.limit,0);
      this.getCorrectAnswers([{"questionId":this.id}],true,this.pagination_data3.limit,0);
    }, error => {
    });
  }

  uploadFile(key, event) {
    if(key == 'sponsor_banner'){
      this.formGroup2.patchValue({
        sponsor_banner: <File>event.target.files[0]
      });
      this.formGroup2.get(key).updateValueAndValidity();
    }
    else if(key == 'sponsor_logo'){
      this.formGroup3.patchValue({
        sponsor_logo: <File>event.target.files[0]
      });
      this.formGroup3.get(key).updateValueAndValidity();
    }
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }

    return 'active';
  }

  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  ngAfterViewInit() {
    // init code preview examples
    // see /src/assets/js/layout/extended/examples.js
    const elements = this.el.nativeElement.querySelectorAll('.example');
    // KTLayoutExamples.init(elements);
  }

  selectWinner(winID: number){
    if(this.weeklyQuizResponse && this.weeklyQuizResponse.winner && this.weeklyQuizResponse.winner.id){
      this.toastr.warning('Winner already selected', 'Error!')
    }else{
      const modalRef = this.modalService.open(UpdateConfModelComponent, { size: 'lg' });
      modalRef.componentInstance.id = winID;
      modalRef.componentInstance.type = 'Select & Save Quiz Winner';
      modalRef.componentInstance.value = 'set selected student as winner this selected quiz?';
      
      modalRef.result.then(() =>
      this.weeklyQuizService.getWeeklyQuizById(this.id).subscribe((data:any) => {
        this.weeklyQuizResponse = data.data;
      }, error => {
      }),
        () => { }
      );
    }
  }

  getAllAnswers(filter:any,correct:any,limit: number,skip: number){
    this.weeklyQuizService.getAllStudentAnswers(filter,correct,limit,skip).subscribe((list:any) => {
      this.allStudentAnswerResponse = list.data.results;
     
      this.pagination_data2.total = list.data.pagination.total;
      this.dataSource2 = this.allStudentAnswerResponse.map((res:any)=>{
        console.log(res)
        const found = this.weeklyQuizResponse.answers.find(element => element.id == res.answer_id);
        if(found){
          res.answer = found.answer;
        }
        return res;
      });

      this.cdr.markForCheck();
      console.log(this.dataSource2)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  getCorrectAnswers(filter:any,correct:any,limit: number,skip: number){
    this.weeklyQuizService.getAllStudentAnswers(filter,correct,limit,skip).subscribe((list:any) => {
      this.allStudentCorrectAnswerResponse = list.data.results;
      this.pagination_data3.total = list.data.pagination.total;
      this.dataSource3 = this.allStudentCorrectAnswerResponse.map((res:any)=>{
        console.log(res)
        const found = this.weeklyQuizResponse.answers.find(element => element.id == res.answer_id);
        if(found){
          res.answer = found.answer;
        }
        return res;
      });
      this.cdr.markForCheck();
      console.log(this.dataSource3)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  deletePic() {
    this.user.pic = '';
  }

  save() {
    const formData = new FormData();
    formData.append('question', this.formGroup.get('question').value);
    formData.append('sponsor_web_url',this.formGroup.get('redirectUrl').value);
    formData.append('status',this.formGroup.get('status').value);

    this.updateService(formData);
  }

  updateSponsorBanner() {
    const formData = new FormData();
    formData.append('sponsor_banner',this.formGroup.get('sponsor_banner').value);
    this.updateService(formData);
   }

   updateSponsorLogo() {
    const formData = new FormData();
    formData.append('sponsor_logo',this.formGroup3.get('sponsor_logo').value);
    this.updateService(formData);
   }

   updateService(formData:any){
    this.weeklyQuizService
    .updateWeeklyQuizDetails(formData, this.id)
    .subscribe((data:any) => {
      this.weeklyQuizResponse =data.data;
      this.cdr.markForCheck();
      console.log(this.weeklyQuizResponse)
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

  delete(id:any){

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }


  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  pageEvent2(event: any) {
		this.pagination_data2.limit = event.pageSize;
		this.pagination_data2.pageIndex = event.pageIndex;
		this.getAllAnswers([{"questionId":this.id}],null,event.pageSize,event.pageIndex*event.pageSize);
	}

  pageEvent3(event: any) {
		this.pagination_data3.limit = event.pageSize;
		this.pagination_data3.pageIndex = event.pageIndex;
		this.getCorrectAnswers([{"questionId":this.id}],true,event.pageSize,event.pageIndex*event.pageSize);
	}
}
