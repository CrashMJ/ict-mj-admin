import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LiveClassService } from '../services/liveClass.service';
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { VodEnrollService } from "../../vod-enrollments/services/vod-enroll.service";
import { TeacherService } from "../../teacher-management/services/teacher.service";
import * as moment from "moment";
import { LiveEnrollService } from "../../live-enrollments/services/live-enroll.service";

@Component({
  selector: "app-edit-live-class",
  templateUrl: "./edit-live-class.component.html",
  styleUrls: ["./edit-live-class.component.scss"],
})
export class EditLiveClassComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  id: any;
  vidoeResponse: any;
  vodEnrollObj: any;
  submitting = false;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  vimeo_iframe_html: any;

  displayedColumns2: string[] = [ 'id','live_class_id','live_class','type','student_id','name','phone','student_in_class','created_at','action'];
  
  dataSource2: any;
  pagination_item_counts2 = environment.pagination_item_counts;
  pagination_data2 = environment.pagination_data;

  teacherObj: any;
  classDates: any = [];
  addBtnStatus = false;
  timeSlotDump: any = {
    date: '',
    stime: '',
    etime: ''
  };

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private liveClassService: LiveClassService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private liveEnrollService: LiveEnrollService,
    public teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      topic: ["", Validators.required],
      description: ["", Validators.required],
      type: ["DAY", Validators.required],
      fee: ["", Validators.required],
      video_url: ["",],
      vod_code: [""],
      free_code: ["", Validators.required],
      zoom_meeting_id: [""],
      zoom_meeting_live: [false, Validators.required],
      status: ["", Validators.required],
      studio_class: [false, Validators.required],
    });

    this.formGroup2 = this.fb.group({
      tute: ["", Validators.required],
    });

    this.formGroup3 = this.fb.group({
      video_thumbnail: ["", Validators.required],
    });

    this.id = this.route.snapshot.params.id;
    this.liveClassService.getClassById(this.id).subscribe((data: any) => {
      // console.log(data);
      this.vidoeResponse = data.data;
      if(this.vidoeResponse.class_dates && this.vidoeResponse.class_dates.length > 0){
        this.classDates = this.vidoeResponse.class_dates.map((item: any)=>{
          const chars = item.time.split(' to ');
          return {
            "date": item.date,
            "time": item.time,
            "stime": moment(chars[0], "h:mm A").format("HH:mm"),
            "etime": moment(chars[1], "h:mm A").format("HH:mm"),
          }
        });
        console.log(this.classDates)
      }
      this.formGroup.get("topic").setValue(this.vidoeResponse.topic);
      this.formGroup.get("description").setValue(this.vidoeResponse.description);
      this.formGroup.get("type").setValue(this.vidoeResponse.type);
      this.addBtnStatus = this.vidoeResponse.type;
      // if(this.vidoeResponse.type === ' MONTHLY'){
      //   this.addBtnStatus = this.vidoeResponse.type;
      // }
      this.formGroup.get("fee").setValue(this.vidoeResponse.fee);
      this.formGroup.get("vod_code").setValue(this.vidoeResponse.vod_code);
      this.formGroup
        .get("free_code")
        .setValue(this.vidoeResponse.free_code);
      this.formGroup.get("zoom_meeting_id").setValue(this.vidoeResponse.zoom_meeting_id);
      this.formGroup.get("zoom_meeting_live").setValue(this.vidoeResponse.zoom_meeting_live);
      this.formGroup.get("status").setValue(this.vidoeResponse.status);
      this.formGroup.get("studio_class").setValue(this.vidoeResponse.studio_class);
      this.cdr.markForCheck();
    });
    this.getEnrolls([{ liveClassId: this.id }], this.pagination_data2.limit, 0);
    this.getTeachers([{ status: "ACTIVE" }], 1000, 0);
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

  getEnrolls(filter: any, limit: number, skip: number) {
    this.liveEnrollService.getVodEnroll(filter, limit, skip).subscribe(
      (list: any) => {
        this.vodEnrollObj = list.data.results;
        this.pagination_data2.total = list.data.pagination.total;
        this.dataSource2 = this.vodEnrollObj;

        this.cdr.markForCheck();
        console.log(this.dataSource2);
      },
      (error) => {
        // this.toastr.warning("Something went wrong.", "Error!");
        console.log(error); // The error is here
      }
    );
  }

  uploadFile(key, event) {
    if (key == "video_thumbnail") {
      this.formGroup3.patchValue({
        video_thumbnail: <File>event.target.files[0],
      });
      this.formGroup3.get(key).updateValueAndValidity();
    }
    if (key == "tute") {
      this.formGroup2.patchValue({
        tute: <File>event.target.files[0],
      });
      this.formGroup2.get(key).updateValueAndValidity();
    }
  }

  updateThumb() {
    const formData = new FormData();
    formData.append("video_thumbnail", this.formGroup3.get("video_thumbnail").value);
    this.updateService(formData);
  }

  updateTute() {
    const formData = new FormData();
    formData.append("tute", this.formGroup2.get("tute").value);
    this.updateService(formData);
  }

  addTimeSlot() {
    if(this.timeSlotDump.date !== '' && this.timeSlotDump.etime !== '' && this.timeSlotDump.stime !== ''){
      if(this.formGroup.get("type").value === 'MONTHLY'){
        this.classDates.push(this.timeSlotDump);
        this.timeSlotDump= {
          date: '',
          stime: '',
          etime: ''
        };
        this.cdr.markForCheck();
      }else if(this.classDates.length < 1){
        this.classDates.push(this.timeSlotDump);
        this.timeSlotDump= {
          date: '',
          stime: '',
          etime: ''
        };
        this.cdr.markForCheck();
      }
    
    }
    console.log(this.classDates)
  }

  removeTimeSlot(index:number) {
    this.classDates.splice(index,  1);
    console.log(this.classDates)
  }

  addTimeSlotItem(key:any, value:any) {
    this.timeSlotDump[key] = value;
    console.log(this.timeSlotDump)
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  updateService(formData: any) {
    this.submitting = true;
    this.liveClassService.updateClassDetails(formData, this.id).subscribe(
      (data: any) => {
        this.submitting = false;
        this.vidoeResponse = data.data;
        this.cdr.markForCheck();
        console.log(this.vidoeResponse);
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
        } else if (data.statusCode === 400) {
          this.toastr.warning(data.message, "Warning");
        } else {
          this.toastr.warning("Something Went Wrong", "Error!");
        }
      },
      (err) => {
        this.submitting = false;
        if (err.error && err.error.message) {
          this.toastr.error(err.error.message, "Error");
          this.toastr.error(JSON.stringify(err.error.errors), "Error");
        } else this.toastr.warning("Something Went Wrong", "Error!");
      }
    );
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

  saveTime() {
    let classDates2 = this.classDates.map((item: any)=>{
      return {
        "date": item.date,
        "time": item.stime + " to " +item.etime,
      }
    });
    if(this.formGroup.get("type").value === 'MONTHLY'){
      this.updateService({"class_dates": classDates2});
    }else{
      let classDates3 = [classDates2[0]]
      this.updateService({"class_dates": classDates3});
    }
    
  }


  save() {
    const formData = new FormData();

    formData.append("topic", this.formGroup.get("topic").value);
    formData.append("description", this.formGroup.get("description").value);
    formData.append("type", this.formGroup.get("type").value);
    formData.append("fee", this.formGroup.get("fee").value);
    formData.append("free_code", this.formGroup.get("free_code").value);
    if(this.formGroup.get("video_url").value){
      formData.append("video_url", this.formGroup.get("video_url").value);
    }else
      formData.append("video_url", '');

    if(this.formGroup.get("vod_code").value){
      formData.append("vod_code", this.formGroup.get("vod_code").value);
    }else
      formData.append("vod_code", '');

    if(this.formGroup.get("zoom_meeting_id").value){
      formData.append("zoom_meeting_id", this.formGroup.get("zoom_meeting_id").value);
    }else
      formData.append("zoom_meeting_id", '');

    formData.append("zoom_meeting_live", this.formGroup.get("zoom_meeting_live").value);
    formData.append("status", this.formGroup.get("status").value);
    formData.append("studio_class", this.formGroup.get("studio_class").value);
  
    this.updateService(formData);
  }

  getTute() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  getThumbnail() {
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

  pageEvent2(event: any) {
    this.pagination_data2.limit = event.pageSize;
    this.pagination_data2.pageIndex = event.pageIndex;
    this.getEnrolls(
      [{ teacherid: this.id }],
      event.pageSize,
      event.pageIndex * event.pageSize
    );
  }
}
