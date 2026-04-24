import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../services/subject.service";

@Component({
  selector: "app-course-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class CourseModelComponent implements OnInit {
  @Input() id: number;
  @Input() moduleId: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  classDetails: any;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    console.log(this.id);
    this.formGroup = this.fb.group({
      name_en: ["", Validators.required],
      title_tag_en: ["", Validators.required],
      module_number: ["", Validators.required],
      module_code: ["", Validators.required],
      description_en: ["", Validators.required],
      course_id: [this.id, Validators.required],
    });

    if (this.moduleId) {
      this.subjectService.getModuleDetailById(this.moduleId).subscribe(
        (data: any) => {
          console.log(data);
          if (data.statusCode === 200) {
            this.classDetails = data.data;
            this.formGroup.get("name_en").setValue(this.classDetails.name_en);
            this.formGroup
              .get("title_tag_en")
              .setValue(this.classDetails.title_tag_en);
            this.formGroup
              .get("module_number")
              .setValue(this.classDetails.module_number);
            this.formGroup
              .get("module_code")
              .setValue(this.classDetails.module_code);
            this.formGroup
              .get("description_en")
              .setValue(this.classDetails.description_en);
            this.formGroup
              .get("course_id")
              .setValue(this.classDetails.course_id);
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
    const formData = new FormData();
    formData.append("name_en", this.formGroup.get("name_en").value);
    formData.append("title_tag_en", this.formGroup.get("title_tag_en").value);
    formData.append("module_number", this.formGroup.get("module_number").value);
    formData.append("module_code", this.formGroup.get("module_code").value);
    formData.append(
      "description_en",
      this.formGroup.get("description_en").value
    );
    formData.append("course_id", this.formGroup.get("course_id").value);

    formData.append("name_sn", "");
    formData.append("title_tag_sn", "");
    formData.append("description_sn", "");

    if (this.moduleId) {
      this.subjectService
        .updateModuleDetails(formData, this.moduleId)
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
    } else {
      this.subjectService.saveModuleDetails(formData).subscribe(
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
