import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from '../../teacher-management/services/teacher.service';
import { SubscriptionFreeCardService } from '../services/subscription-free-cards.service';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateFreeCardModalComponent implements OnInit {

  formGroup: FormGroup;
  submitting= false;
  teacherObj: any;

  constructor(
    public subscriptionFreeCardService: SubscriptionFreeCardService,
    private fb: FormBuilder,public modal: NgbActiveModal,private cdr: ChangeDetectorRef,private toastr: ToastrService,
    public teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getTeachers([{ status: "ACTIVE" }], 1000, 0);
    this.formGroup = this.fb.group({
      student_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      number_of_months: ['', Validators.required],
    });
  }

  save() {
    this.submitting = true;
    this.subscriptionFreeCardService
    .createVodSubscription({
      "student_id": this.formGroup.get('student_id').value,
      "teacher_id": this.formGroup.get('teacher_id').value,
      "number_of_months": this.formGroup.get('number_of_months').value
     })
    .subscribe((data:any) => {
      this.submitting = false;
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
      this.modal.close('Close click');
    },
      err=>{
        this.submitting = false;
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      }
    );
  }

  getTeachers(filter: any, limit: number, skip: number) {
    this.teacherService.getAllTeacher(filter, limit, skip).subscribe(
      (teacherList: any) => {
        this.teacherObj = teacherList.data.results;
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
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
