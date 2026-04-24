import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth';
import { districts } from 'src/config/districts.config';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { StudentService } from '../../../student-management/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CampusContactUsService } from '../service/campus-contactUs.service';
import { VodEnrollService } from '../../../vod-enrollments/services/vod-enroll.service';
import { VodSubscriptionService } from '../../../vod-subscriptions/services/vod-subscription.service';
import { OptionService } from '../../option-management/service/option.service';

@Component({
  selector: 'app-edit-campus-contact',
  templateUrl: './edit-campus-contact.component.html',
  styleUrls: ['./edit-campus-contact.component.scss']
})
export class EditCampusContactComponent implements OnInit {

  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  user: UserModel;
  campusResponse: any;
  id: any;
  subjectObj: any;
  districts = districts;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  fileToUpload: File = null;
  optionObj:any;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private optionService: OptionService,
    private campusContactUsService: CampusContactUsService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      after_al_option_id: ["", Validators.required],
     
    });
    this.getOptions([{ status: "ACTIVE" }], 1000, 0);
   
    this.campusContactUsService.getCampusContactUsById(this.id).subscribe(
      (data:any) => {
        this.campusResponse = data.data;
        this.formGroup.get("name").setValue(this.campusResponse.name);
        this.formGroup.get("phoneNumber").setValue(this.campusResponse.phone);
        this.formGroup.get("email").setValue(this.campusResponse.email);
        this.formGroup.get("after_al_option_id").setValue(this.campusResponse.after_al_option.id);
       },
      (error) => {
      }
    );
    
  }
  getOptions(filter: any, limit: number, skip: number) {
    this.optionService.getAllOption(filter, limit, skip).subscribe(
      (intitituteList: any) => {
        this.optionObj = intitituteList.data.results;
        console.log(this.optionObj, intitituteList)
        this.cdr.markForCheck();
      },
      (error) => {
        console.log(error); // The error is here
      }
    );
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return "";
    }

    return "active";
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
    const elements = this.el.nativeElement.querySelectorAll(".example");
    // KTLayoutExamples.init(elements);
  }

  save() {
    const formData = new FormData();
    formData.append("email", this.formGroup.get("email").value);
    formData.append("name", this.formGroup.get("name").value);
    formData.append("phone", this.formGroup.get("phoneNumber").value);
    formData.append("after_al_option_id", this.formGroup.get("after_al_option_id").value);
    this.updateService(formData);
 
  }

   updateService(formData){
    this.campusContactUsService.updateCampusContactUsDetails(formData, this.id)  .subscribe((data:any) => {
      this.campusResponse =data.data;
      this.cdr.markForCheck();
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

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

 

}
