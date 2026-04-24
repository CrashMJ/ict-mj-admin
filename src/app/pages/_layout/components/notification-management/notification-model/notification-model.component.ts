import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../services/notification.service';
import { VodEnrollService } from '../../vod-enrollments/services/vod-enroll.service';
import { InqService } from '../../inq/services/inq.service';

@Component({
  selector: 'app-notification-model',
  templateUrl: './notification-model.component.html',
  styleUrls: ['./notification-model.component.scss']
})
export class NotificationModelComponent implements OnInit {


  isLoading$;
  formGroup: FormGroup;
  smsType='Custom';
  classId=null;
  inqGrade=null;
  inqYear=null;
  vodEnrollObj: any;

  classNumberList: any[] = [];
  inquiryNumberList: any[] = [];

  tipObj: any;

  private subscriptions: Subscription[] = [];
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    private vodEnrollService: VodEnrollService,
    private inqService: InqService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      msg: ['', Validators.required],
      numbers: [''],
    });
  }

  save() {
    var numberList:any[];
    if(this.smsType=='Custom')
      numberList = this.formGroup.get("numbers").value.split(',');
    else if(this.smsType=='Class')
      numberList = this.classNumberList;
    else if(this.smsType=='Inquiry')
      numberList = this.inquiryNumberList;

    if(numberList.length == 0)
      this.toastr.warning("Please select at least 1 number", "Warning");
    
    this.notificationService.save({
      title: this.formGroup.get("title").value,
      msg: this.formGroup.get("msg").value,
      numbers: numberList,
      response: this.smsType == 'Class' ? `${this.smsType} - ID: ${this.classId}` : this.smsType == 'Inquiry' ? `${this.smsType} - Grade: ${this.inqGrade} - Year: ${this.inqYear}` : this.smsType,
    }).subscribe(
      (data) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
          this.modal.close("Close click");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        }
      },
      (err) => {
        this.toastr.error(err, "Error");
      }
    );
  }

  getDataEnroll() {
    this.classNumberList = [];
    this.vodEnrollService.getVodEnroll({course_id: this.classId, status: 'active'}, 5000, 0).subscribe(
      (list: any) => {
        this.vodEnrollObj = list.data.results;
        if(list.data.results && list.data.results.length > 0){
          list.data.results.forEach((rec:any) => {
            this.classNumberList.push(rec.student.phone)
          });
        }
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  getDataInq() {
    this.inquiryNumberList = [];
    this.inqService.getAllTips({class_grade: this.inqGrade, exam_year: this.inqYear},5000, 0).subscribe(
      (list: any) => {
        this.tipObj = list.data.results;
        if(list.data.results && list.data.results.length > 0){
          list.data.results.forEach((rec:any) => {
            this.inquiryNumberList.push(rec.student_phone)
          });
        }
        this.cdr.markForCheck();
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }


  setType(value){
    this.smsType = value;
  }

  setClassId(value){
    this.classId = value;
  }

  setInqGrade(value){
    this.inqGrade = value;
  }

  setInqYear(value){
    this.inqYear = value;
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }

    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    // this.user.pic = '';
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
