import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserModel } from 'src/app/modules/auth';
import { districts } from 'src/config/districts.config';
import { TeacherService } from '../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { VideoService } from '../../video-management/services/video.service';
import { VodEnrollService } from '../../vod-enrollments/services/vod-enroll.service';
import { VodSubscriptionService } from '../../vod-subscriptions/services/vod-subscription.service';
import { SubjectService } from '../../subject-management/services/subject.service';
import { VodDashboardService } from '../services/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  model: any;
  user: UserModel;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup31: FormGroup;z
  formGroup32: FormGroup;
  formGroup33: FormGroup;
  districts = districts;
  id:any;
  teacherResponse:any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  // videos
  displayedColumns1: string[] = [ 'id','video_code','title','medium','price','grade','status','action'];
  dataSource1:any;
  pagination_item_counts1 = environment.pagination_item_counts;
	pagination_data1 = environment.pagination_data; 
  videoObj: any;

  displayedColumns2: string[] = [ 'id','video_id','video_price','video_code','student_id','name','email','phone','status','created_at','action'];
  dataSource2:any;
  pagination_item_counts2 = environment.pagination_item_counts;
	pagination_data2 = environment.pagination_data;
  vodEnrollObj:any;

  displayedColumns3: string[] = [ 'id','name','phone','recurring_amount','payment_method','status','created_at','action'];
  dataSource3:any;
  pagination_item_counts3 = environment.pagination_item_counts;
	pagination_data3 = environment.pagination_data;
  vodSubsObj:any;

  subjectObj: any;

  dashboardFormGroup:FormGroup;
  maxDate: Date;
  todaycolor = false;
  yesterdatColor = false;
  sevenDayColor = false;
  thirtyDayColor = false;
  isFromDateSeleted = false;
  heading1: string = 'VOD Summary';
  heading2: string = 'VOD Enrollments';
  heading3: string = 'Profit Details';
  heading4: string = 'Total Videos Summary';
  amount1: string = 'Total video count: 978';
  subheading: string = 'Total view Video Count: ';
  totalViewCount:any;
  contentObject1: any = {
    heading1: 'Total Teachers',
    heading2: 'Total Lessons',
    heading3: 'Total Earning',
    amount1: '28',
    amount2: '169',
    amount3: 'LKR 350,000.00'
  }
  contentObject2: any = {
    heading1: 'Total Amount',
    heading2: 'Total Classes today',
    heading3: 'Total Attendance ',
    amount1: 'LKR 350,000.00',
    amount2: '5',
    amount3: '47'
  }
  contentObject: any;

  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  constructor(private layout: LayoutService,private dashboardService: VodDashboardService,private formBuilder: FormBuilder,private cdr: ChangeDetectorRef,private toastr: ToastrService,private route: ActivatedRoute, private el: ElementRef,public teacherService: TeacherService, private fb: FormBuilder,public videoService: VideoService, private vodEnrollService: VodEnrollService, private vodSubscriptionService: VodSubscriptionService,private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.dashboardFormGroup = this.formBuilder.group({
      fromDate: [''],
      toDate: [''],
    })
    this.getSubjects([{"status": "ACTIVE"}],1000,0);
    this.getEnrolls([{"teacherid":this.id}],this.pagination_data2.limit,0);
    this.getSubs([{"teacherid":this.id}],this.pagination_data3.limit,0);
    this.getDataVideos([{"teacherid":this.id}],this.pagination_data1.limit,0);
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nic: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      subject: ['', Validators.required],
      status: ['', Validators.required],
      subscription_price: ['', Validators.required],
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
      mobile_banner_image: ['', Validators.required],
    });
   
    this.teacherService.getTeacherById(this.id).subscribe((data:any)=>{
      this.teacherResponse = data.data.teacher;
      this.formGroup.get('name').setValue(this.teacherResponse.name);
      this.formGroup.get('email').setValue(this.teacherResponse.email);
      this.formGroup.get('phone').setValue(this.teacherResponse.phone);
      this.formGroup.get('nic').setValue(this.teacherResponse.nic);
      this.formGroup.get('address').setValue(this.teacherResponse.address);
      this.formGroup.get('city').setValue(this.teacherResponse.city);
      this.formGroup.get('district').setValue(this.teacherResponse.district);
      this.formGroup.get('subject').setValue(this.teacherResponse.subject.id);
      this.formGroup.get('status').setValue(this.teacherResponse.status);
      this.formGroup.get('subscription_price').setValue(this.teacherResponse.subscription_price);
    },error=>{
      this.toastr.warning("Something Went Wrong", 'Error!')
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

  getEnrolls(filter:any,limit: number,skip: number){
    this.vodEnrollService.getVodEnroll(filter,limit,skip).subscribe((list:any) => {
      this.vodEnrollObj = list.data.results;
      this.pagination_data2.total = list.data.pagination.total;
      this.dataSource2 = this.vodEnrollObj;

      this.cdr.markForCheck();
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  getSubs(filter:any,limit: number,skip: number){
    this.vodSubscriptionService.getVodSubscription(filter,limit,skip).subscribe((list:any) => {
      this.vodSubsObj = list.data.results;
      this.pagination_data3.total = list.data.pagination.total;
      this.dataSource3 = this.vodSubsObj;

      this.cdr.markForCheck();
    },
    (error) => {
      // this.toastr.warning("Something went wrong.", "Error!");
      console.log(error); // The error is here
    })
  }

  getDataVideos(filter:any,limit: number,skip: number){
    this.videoService.getAllVideos(filter,limit,skip).subscribe((dataList:any) => {
      this.videoObj = dataList.data.results;
      this.pagination_data1.total = dataList.data.pagination.total;
      this.dataSource1 = this.videoObj;

      this.cdr.markForCheck();
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

   updateMobileBanner() {
    const formData = new FormData();
    formData.append('mobile_banner_image',this.formGroup33.get('mobile_banner_image').value);
    this.updateService(formData);
   }

   updatePassword() {
    const formData = new FormData();
    formData.append('password',this.formGroup2.get('password').value);
    this.updateService(formData);
   }

   updateService(formData:any){
    this.teacherService
    .updateTeacherDetails(formData, this.id)
    .subscribe((data:any) => {
      this.teacherResponse =data.data;
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
    else if(key == 'mobile_banner_image'){
      this.formGroup33.patchValue({
        mobile_banner_image: <File>event.target.files[0]
      });
      this.formGroup33.get(key).updateValueAndValidity();
    }
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
    formData.append('nic', this.formGroup.get('nic').value);
    formData.append('phone', this.formGroup.get('phone').value);
    formData.append('address',this.formGroup.get('address').value);
    formData.append('subject',this.formGroup.get('subject').value);
    formData.append('city', this.formGroup.get('city').value);
    formData.append('district', this.formGroup.get('district').value);
    formData.append('status', this.formGroup.get('status').value);
    formData.append('subscription_price', this.formGroup.get('subscription_price').value);

    formData.append('medium', 'SINHALA');
    const findSub = this.subjectObj.find((row:any)=>row.id === this.formGroup.get('subject').value);
    if(findSub && findSub.medium)
      formData.append('medium', findSub.medium);
      
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

  
  last30DaysClick(){
    this.todaycolor =  false;
    this.yesterdatColor = false;
    this.sevenDayColor = false;
    this.thirtyDayColor = !this.thirtyDayColor;
    let dte = new Date();
    dte.setDate(dte.getDate() - 30);
    let dte2 = new Date();
    dte2.setDate(dte2.getDate() - 1);
    this.dashboardFormGroup.get('fromDate').setValue(dte);
    this.dashboardFormGroup.get('toDate').setValue(this.maxDate);
    let dateRangeObj ={
      from:moment(dte).format('YYYY-MM-DD')+"T00:00:00.000Z",
      to: moment(dte2).format('YYYY-MM-DD')+"T23:59:59.000Z",
    }
    this.dashboardService.getVideoCount(dateRangeObj,this.id).subscribe((data:any)=>{
      this.contentObject = data.data;
      this.cdr.markForCheck();
    })
  }

  last7DaysClick(){
    
    this.todaycolor =  false;
    this.yesterdatColor = false;
    this.sevenDayColor = !this.sevenDayColor;
    this.thirtyDayColor = false;
    let dte = new Date();
    dte.setDate(dte.getDate() - 7);
    let dte2 = new Date();
    dte2.setDate(dte2.getDate() - 1);
    this.dashboardFormGroup.get('fromDate').setValue(dte);
    this.dashboardFormGroup.get('toDate').setValue(this.maxDate);
    let dateRangeObj ={
      from:moment(dte).format('YYYY-MM-DD')+"T00:00:00.000Z",
      to: moment(dte2).format('YYYY-MM-DD')+"T23:59:59.000Z",
    }
    this.dashboardService.getVideoCount(dateRangeObj,this.id).subscribe((data:any)=>{
      this.contentObject = data.data;
      this.cdr.markForCheck();
    })
  }

  yesterdayClick(){
    
    this.todaycolor =  false;
    this.yesterdatColor = !this.yesterdatColor;
    this.sevenDayColor = false;
    this.thirtyDayColor = false;
    this.isFromDateSeleted = true;
    this.isFromDateSeleted = true;
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    this.dashboardFormGroup.get('fromDate').setValue(dte);
    this.dashboardFormGroup.get('toDate').setValue(this.maxDate);
    let dateRangeObj ={
      from: moment(dte).format('YYYY-MM-DD')+"T00:00:00.000Z",
      to: moment(dte).format('YYYY-MM-DD')+"T23:59:59.000Z",
    }
    this.dashboardService.getVideoCount(dateRangeObj,this.id).subscribe((data:any)=>{
      this.contentObject = data.data;
      this.cdr.markForCheck();
    })
  }

  todayClick(){
    this.todaycolor =  !this.todaycolor;
    this.yesterdatColor = false;
    this.sevenDayColor = false;
    this.thirtyDayColor = false;
    this.dashboardFormGroup.get('fromDate').setValue(this.maxDate);
    this.dashboardFormGroup.get('toDate').setValue(this.maxDate);
    let dateRangeObj ={
      from:moment(this.maxDate).format('YYYY-MM-DD')+"T00:00:00.000Z",
      to:moment(this.maxDate).format('YYYY-MM-DD')+"T23:59:59.000Z",
    }
    this.dashboardService.getVideoCount(dateRangeObj,this.id).subscribe((data:any)=>{
      this.contentObject = data.data;
      this.cdr.markForCheck();
    })
  }

  filterClick(){
    let dateRangeObj:any ={
      from:this.dashboardFormGroup.get('fromDate').value,
      to:this.dashboardFormGroup.get('toDate').value
    }
    dateRangeObj.from = moment(dateRangeObj.from).format('YYYY-MM-DD')+"T00:00:00.000Z";
    dateRangeObj.to = moment(dateRangeObj.to).format('YYYY-MM-DD')+"T00:00:00.000Z";
    this.dashboardService.getVideoCount(dateRangeObj,this.id).subscribe((data:any)=>{
      this.contentObject = data.data;
      this.cdr.markForCheck();
    })
  }

  deletePic() {
    this.user.pic = '';
  }

  pageEvent1(event: any) {
		this.pagination_data1.limit = event.pageSize;
		this.pagination_data1.pageIndex = event.pageIndex;
		this.getDataVideos([{"teacherId":this.id}],event.pageSize,event.pageIndex*event.pageSize);
	}

  pageEvent2(event: any) {
		this.pagination_data2.limit = event.pageSize;
		this.pagination_data2.pageIndex = event.pageIndex;
		this.getEnrolls([{"teacherid":this.id}],event.pageSize,event.pageIndex*event.pageSize);
	}

  pageEvent3(event: any) {
		this.pagination_data3.limit = event.pageSize;
		this.pagination_data3.pageIndex = event.pageIndex;
		this.getSubs([{"teacherid":this.id}],event.pageSize,event.pageIndex*event.pageSize);
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

}
