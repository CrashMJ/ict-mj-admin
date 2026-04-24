import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth';
import { districts } from 'src/config/districts.config';
import { LiveTeacherService } from '../services/live-teacher.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { VideoService } from '../../video-management/services/video.service';
import { VodEnrollService } from '../../vod-enrollments/services/vod-enroll.service';
import { VodSubscriptionService } from '../../vod-subscriptions/services/vod-subscription.service';
import { SubjectService } from '../../subject-management/services/subject.service';
import { LiveClassService } from '../../live-class-management/services/liveClass.service';

@Component({
  selector: 'app-edit-live-teacher',
  templateUrl: './edit-live-teacher.component.html',
  styleUrls: ['./edit-live-teacher.component.scss']
})
export class EditLiveTeacherComponent implements OnInit {
  model: any;
  user: UserModel;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup31: FormGroup;
  formGroup32: FormGroup;
  formGroup33: FormGroup;
  formGroup34: FormGroup;
  districts = districts;
  id:any;
  teacherResponse:any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  // videos
  displayedColumns1: string[] =  [ 'id','topic','fee','type','free_code','status','created_at','action'];
  dataSource1:any;
  pagination_item_counts1 = environment.pagination_item_counts;
	pagination_data1 = environment.pagination_data; 
  videoObj: any;

  subjectObj: any;

  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  constructor(private layout: LayoutService,private cdr: ChangeDetectorRef,private toastr: ToastrService,private route: ActivatedRoute, private el: ElementRef,public liveTeacherService: LiveTeacherService, private fb: FormBuilder,public liveClassService: LiveClassService,private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getSubjects([{"status": "ACTIVE"}],1000,0);
    this.getData([{"teacherId":this.id}],this.pagination_data1.limit,0);
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      zoom_email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      subject: ['', Validators.required],
      status: ['', Validators.required],
      teacher_class: ['', Validators.required],
      about_you: ['', Validators.required],
      time_table: ['', Validators.required],
    });
    this.formGroup2 = this.fb.group({
      password: ['', Validators.required]
    });
    this.formGroup31 = this.fb.group({
      profile_image: ['', Validators.required],
    });
    this.formGroup32 = this.fb.group({
      banner_image: ['', Validators.required],
    });
    this.formGroup33 = this.fb.group({
      nic_side_1: ['', Validators.required],
    });
    this.formGroup34 = this.fb.group({
      nic_side_2: ['', Validators.required],
    });
   
    this.liveTeacherService.getTeacherById(this.id).subscribe((data:any)=>{
      this.teacherResponse = data.data.teacher;
      this.formGroup.get('name').setValue(this.teacherResponse.name);
      this.formGroup.get('email').setValue(this.teacherResponse.email);
      this.formGroup.get('zoom_email').setValue(this.teacherResponse.zoom_email);
      this.formGroup.get('phone').setValue(this.teacherResponse.phone);
      this.formGroup.get('nic').setValue(this.teacherResponse.nic);
      this.formGroup.get('address').setValue(this.teacherResponse.address);
      this.formGroup.get('city').setValue(this.teacherResponse.city);
      this.formGroup.get('district').setValue(this.teacherResponse.district);
      this.formGroup.get('subject').setValue(this.teacherResponse.subject.id);
      this.formGroup.get('status').setValue(this.teacherResponse.status);
      this.formGroup.get('about_you').setValue(this.teacherResponse.teacher_class);
      this.formGroup.get('teacher_class').setValue(this.teacherResponse.teacher_class);
      this.formGroup.get('time_table').setValue(this.teacherResponse.time_table);
      console.log(this.teacherResponse)
    },error=>{
      this.toastr.warning("Something Went Wrong", 'Error!')
      console.log(error)
    });
    // 
   
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

  getData(filter:any,limit: number,skip: number){
    this.liveClassService.getAllLiveVideos(filter,limit,skip).subscribe((list:any) => {
      this.videoObj = list.data.results;
      this.pagination_data1.total = list.data.pagination.total;
      this.dataSource1 = this.videoObj;

      this.cdr.markForCheck();
      // console.log(this.dataSource1)
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
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

  updateProfileBanner() {
    const formData = new FormData();
    formData.append('profile_image',this.formGroup31.get('profile_image').value);
    this.updateService(formData);
   }

   updateDesktopBanner() {
    const formData = new FormData();
    formData.append('banner_image',this.formGroup32.get('banner_image').value);
    this.updateService(formData);
   }

   updateNIC1() {
    const formData = new FormData();
    formData.append('nic_side_1',this.formGroup33.get('nic_side_1').value);
    this.updateService(formData);
   }

   updateNIC2() {
    const formData = new FormData();
    formData.append('nic_side_2',this.formGroup34.get('nic_side_2').value);
    this.updateService(formData);
   }

   updatePassword() {
    const formData = new FormData();
    formData.append('password',this.formGroup2.get('password').value);
    this.updateService(formData);
   }

   updateService(formData:any){
    this.liveTeacherService
    .updateTeacherDetails(formData, this.id)
    .subscribe((data:any) => {
      this.teacherResponse =data.data;
      this.cdr.markForCheck();
      console.log(this.teacherResponse)
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


  resetPreview(): void {
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.layout.setConfig(this.model);
    location.reload();
  }

  
  uploadFile(key, event) {
    if(key == 'profile_image'){
      this.formGroup31.patchValue({
        profile_image: <File>event.target.files[0]
      });
      this.formGroup31.get(key).updateValueAndValidity();
    }
    else if(key == 'banner_image'){
      this.formGroup32.patchValue({
        banner_image: <File>event.target.files[0]
      });
      this.formGroup32.get(key).updateValueAndValidity();
    }
    else if(key == 'nic_side_1'){
      this.formGroup33.patchValue({
        nic_side_1: <File>event.target.files[0]
      });
      this.formGroup33.get(key).updateValueAndValidity();
    }
    else if(key == 'nic_side_2'){
      this.formGroup34.patchValue({
        nic_side_2: <File>event.target.files[0]
      });
      this.formGroup34.get(key).updateValueAndValidity();
    }
    console.log(<File>event.target.files[0])
  }

  ngAfterViewInit() {
    // init code preview examples
    // see /src/assets/js/layout/extended/examples.js
    const elements = this.el.nativeElement.querySelectorAll('.example');
    // KTLayoutExamples.init(elements);
  }
  save() { 
    const formData = new FormData();
   
    formData.append('name',this.formGroup.get('name').value);
    formData.append('email', this.formGroup.get('email').value);
    formData.append('zoom_email', this.formGroup.get('zoom_email').value);
    formData.append('nic', this.formGroup.get('nic').value);
    formData.append('phone', this.formGroup.get('phone').value);
    formData.append('address',this.formGroup.get('address').value);
    formData.append('subject',this.formGroup.get('subject').value);
    formData.append('city', this.formGroup.get('city').value);
    formData.append('district', this.formGroup.get('district').value);
    formData.append('status', this.formGroup.get('status').value);
    formData.append('teacher_class', this.formGroup.get('teacher_class').value);
    formData.append('about_you', this.formGroup.get('about_you').value);
    formData.append('time_table', this.formGroup.get('time_table').value);
    this.updateService(formData);
  }
  // cancel() {
  //   this.user = Object.assign({}, this.firstUserState);
  //   this.loadForm();
  // }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }

    // return `url('${this.user.pic}')`;
  }

  deletePic() {
    this.user.pic = '';
  }

  pageEvent1(event: any) {
		this.pagination_data1.limit = event.pageSize;
		this.pagination_data1.pageIndex = event.pageIndex;
		this.getData([{"teacherId":this.id}],event.pageSize,event.pageIndex*event.pageSize);
	}

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid31(controlName: string): boolean {
    const control = this.formGroup31.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid31(controlName: string): boolean {
    const control = this.formGroup31.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid32(controlName: string): boolean {
    const control = this.formGroup32.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid32(controlName: string): boolean {
    const control = this.formGroup32.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid33(controlName: string): boolean {
    const control = this.formGroup33.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid33(controlName: string): boolean {
    const control = this.formGroup33.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlValid34(controlName: string): boolean {
    const control = this.formGroup34.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid34(controlName: string): boolean {
    const control = this.formGroup34.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
