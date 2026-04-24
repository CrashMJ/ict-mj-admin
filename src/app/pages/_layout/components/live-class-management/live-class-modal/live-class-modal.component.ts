import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { LiveClassService } from '../services/liveClass.service';
import { ToastrService } from "ngx-toastr";
import { TeacherService } from "../../teacher-management/services/teacher.service";
import { LiveTeacherService } from "../../live-teacher-management/services/live-teacher.service";
import * as moment from "moment";
@Component({
  selector: "app-live-class-modal",
  templateUrl: "./live-class-modal.component.html",
  styleUrls: ["./live-class-modal.component.scss"],
})
export class LiveClassModalComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  submitting = false;
  // imageToUpload: File = null;
  teacherObj: any;
  classDates: any = [];
  addBtnStatus = false;
  timeSlotDump: any = {
    date: '',
    stime: '',
    etime: ''
  };
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public liveTeacherService: LiveTeacherService,
    public liveClassService: LiveClassService,
    public teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.getTeachers([{ status: "ACTIVE" }], 1000, 0);
    this.formGroup = this.fb.group({
      topic: ["", Validators.required],
      description: ["", Validators.required],
      type: ["", Validators.required],
      fee: ["", Validators.required],
      teacher: ["", Validators.required],
      studio_class: [false, Validators.required],
    });
  }

  getTeachers(filter: any, limit: number, skip: number) {
    this.liveTeacherService.getAllTeacher(filter, limit, skip).subscribe(
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

  get f() {
    return this.formGroup.controls;
  }

  uploadFile(key, event) {
    if (key == "tute")
      this.formGroup.patchValue({
        tute: <File>event.target.files[0],
      });
    else if (key == "thumbnail")
      this.formGroup.patchValue({
        thumbnail: <File>event.target.files[0],
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    let classDates2 = this.classDates.map((item: any)=>{
      return {
        "date": item.date,
        "time": moment(item.stime, "HH:mm").format("h:mm a") + " to " + moment(item.etime, "HH:mm").format("h:mm a"),
      }
    });
    if(this.formGroup.get("type").value === 'MONTHLY'){

    }else{
      classDates2 = [classDates2[0]];
    }
    const formData = {
      "topic": this.formGroup.get('topic').value,
      "description": this.formGroup.get('description').value,
      "type": this.formGroup.get('type').value,
      "fee": this.formGroup.get('fee').value,
      "studio_class": this.formGroup.get('studio_class').value,
      "class_dates":  classDates2
     };

    this.submitting = true;
    this.liveClassService.saveClassDetails(formData,this.f.teacher.value).subscribe(
      (data: any) => {
        console.log(data);
        this.submitting = false;
        if (data.statusCode === 200) {
          this.toastr.success(data.message, "Success");
          this.modal.close("Close click");
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  // handleImageInput(files: FileList) {
  //   this.imageToUpload = files.item(0);
  //   console.log(this.imageToUpload)
  // }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
