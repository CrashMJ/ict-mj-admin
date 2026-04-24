import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { WeeklyQuizService } from '../services/weeklyQuiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weekly-quiz-model',
  templateUrl: './weekly-quiz-model.component.html',
  styleUrls: ['./weekly-quiz-model.component.scss']
})
export class WeeklyQuizModelComponent implements OnInit {


  @Input() id: number;
  isLoading$;
  user: UserModel;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  
  fileToUpload: File = null;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    public weeklyQuizService: WeeklyQuizService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      redirectUrl: ['', Validators.required],
      sponsor_banner: ['', Validators.required ],
      sponsor_logo: ['', Validators.required],
    });
  }


  save() {
      
    const formData = new FormData();
    let pusheditems1 = {};
    let pusheditems2 = {};
    let pusheditems3 = {};
    let pusheditems4 = {};
    let ans:any=[];

    pusheditems1["answer"] = this.formGroup.get('answer1').value;
    ans.push(pusheditems1)

    pusheditems2["answer"] = this.formGroup.get('answer2').value;
    ans.push(pusheditems2)

    pusheditems3["answer"] = this.formGroup.get('answer3').value;
    ans.push(pusheditems3)

    pusheditems4["answer"] =this.formGroup.get('answer4').value;
    ans.push(pusheditems4)
    
    formData.append('question', this.formGroup.get('question').value);
    formData.append('answers', JSON.stringify(ans));
    formData.append('sponsor_logo',this.formGroup.get('sponsor_logo').value);
    formData.append('sponsor_banner',this.formGroup.get('sponsor_banner').value);
    formData.append('sponsor_web_url',this.formGroup.get('redirectUrl').value);

    this.weeklyQuizService
      .saveWeeklyQuizDetails(formData)
      .subscribe(data => {
        console.log(data)
        if(data.statusCode === 200){
          this.toastr.success(data.message, 'Success')
          this.modal.close('Close click');
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

   uploadFile(key, event) {
    if(key == 'sponsor_logo')
      this.formGroup.patchValue({
        sponsor_logo: <File>event.target.files[0]
      });
    else if(key == 'sponsor_banner')
      this.formGroup.patchValue({
        sponsor_banner: <File>event.target.files[0]
      });
    this.formGroup.get(key).updateValueAndValidity();
  }
  
   
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  
  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }

    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = '';
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
