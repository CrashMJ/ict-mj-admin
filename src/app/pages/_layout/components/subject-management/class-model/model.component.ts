import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../services/subject.service";

@Component({
  selector: "app-class-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class ClassModelComponent implements OnInit {
  @Input() id: number;
  @Input() classId: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  classDetails:any;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    console.log(this.classId)
    this.formGroup = this.fb.group({
      title: ["", Validators.required],
      start_date: ["", Validators.required],
      end_date: [""],
      start_time: ["", Validators.required],
      end_time: [""],
      description: [""],
      zoom_link: ["", Validators.required],
      record_url: [""],
      zoom_active_status: [""],
      course_id: [this.id],
      module_id: ["", Validators.required],
      session_type: ["paid"],
    });
    if(this.classId){
      this.subjectService
      .getClassDetailById(this.classId)
      .subscribe(
        (data:any) => {
          console.log(data);
          if (data.statusCode === 200) {
            this.classDetails = data.data;
            this.formGroup.get("module_id").setValue(this.classDetails.module_id);
            this.formGroup.get("start_date").setValue(this.classDetails.start_date);
            this.formGroup.get("start_time").setValue(this.classDetails.start_time);
            this.formGroup.get("zoom_link").setValue(this.classDetails.zoom_link);
            this.formGroup.get("record_url").setValue(this.classDetails.record_url);
            this.formGroup.get("title").setValue(this.classDetails.title);
            this.formGroup.get("description").setValue(this.classDetails.description);

          } else if (data.statusCode === 400) {
            this.toastr.warning("Something went wrong", "Warning");
          }
        },
        (err) => {
          this.toastr.error(err, "Error");
        }
      );
    }
    
  }

  save() {
    if(this.classId){
      this.subjectService
      .updateClassDetails({
        title: this.formGroup.get("title").value,
        start_date: this.formGroup.get("start_date").value,
        end_date: this.formGroup.get("end_date").value,
        start_time: this.formGroup.get("start_time").value,
        end_time: this.formGroup.get("end_time").value,
        description: this.formGroup.get("description").value,
        zoom_link: this.formGroup.get("zoom_link").value,
        record_url: this.formGroup.get("record_url").value,
        zoom_active_status: this.formGroup.get("zoom_active_status").value,
        course_id: this.formGroup.get("course_id").value,
        module_id: this.formGroup.get("module_id").value + "",
        session_type: this.formGroup.get("session_type").value,
      }, this.classId)
      .subscribe(
        (data) => {
          console.log(data.statusCode);
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
        // console.log(user)
      );
    }else{
      this.subjectService
      .saveClassDetails({
        title: this.formGroup.get("title").value,
        start_date: this.formGroup.get("start_date").value,
        end_date: this.formGroup.get("end_date").value,
        start_time: this.formGroup.get("start_time").value,
        end_time: this.formGroup.get("end_time").value,
        description: this.formGroup.get("description").value,
        zoom_link: this.formGroup.get("zoom_link").value,
        record_url: this.formGroup.get("record_url").value,
        zoom_active_status: this.formGroup.get("zoom_active_status").value,
        course_id: this.formGroup.get("course_id").value,
        module_id: this.formGroup.get("module_id").value + "",
        session_type: this.formGroup.get("session_type").value,
      })
      .subscribe(
        (data) => {
          console.log(data.statusCode);
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
        // console.log(user)
      );
    }
    
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      image: <File>event.target.files[0],
    });
    this.formGroup.get(key).updateValueAndValidity();
  }

  getPic() {
    // if (!this.user.pic) {
    //   return 'none';
    // }
    // return `url('${this.user.pic}')`;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
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
