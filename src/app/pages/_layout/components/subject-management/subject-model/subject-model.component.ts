import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../services/subject.service";

@Component({
  selector: "app-subject-model",
  templateUrl: "./subject-model.component.html",
  styleUrls: ["./subject-model.component.scss"],
})
export class SubjectModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name_sn: ["", Validators.required],
      name_en: ["", Validators.required],
      course_code: ["", Validators.required],
      class_grade: ["", Validators.required],
      language: ["", Validators.required],
      class_delivery_type: ["", Validators.required],
      class_year: ["", Validators.required],
      class_date_en: ["", Validators.required],
      class_time: ["", Validators.required],
      course_fee: ["", Validators.required],
      description_1_en: [""],
      description_1_sn: [""],
      description_2_en: [""],
      description_2_sn: [""],
      description_3_en: [""],
      description_3_sn: [""],
      image: ["", Validators.required],
    });
  }

  save() {
    const formData = new FormData();
    formData.append("name_sn", this.formGroup.get("name_sn").value);
    formData.append("name_en", this.formGroup.get("name_en").value);
    formData.append("course_code", this.formGroup.get("course_code").value);
    formData.append("class_grade", this.formGroup.get("class_grade").value);
    formData.append("language", this.formGroup.get("language").value);
    formData.append(
      "class_delivery_type",
      this.formGroup.get("class_delivery_type").value
    );
    formData.append("class_year", this.formGroup.get("class_year").value);
    formData.append("class_time", this.formGroup.get("class_time").value);
    formData.append("course_fee", this.formGroup.get("course_fee").value);
    formData.append(
      "description_1_en",
      this.formGroup.get("description_1_en").value
    );
    formData.append(
      "description_1_sn",
      this.formGroup.get("description_1_sn").value
    );
    formData.append(
      "description_2_en",
      this.formGroup.get("description_2_en").value
    );
    formData.append(
      "description_2_sn",
      this.formGroup.get("description_2_sn").value
    );
    formData.append(
      "description_3_en",
      this.formGroup.get("description_3_en").value
    );
    formData.append(
      "description_3_sn",
      this.formGroup.get("description_3_sn").value
    );
    formData.append("icon", this.formGroup.get("image").value);

    this.subjectService.saveSubjectDetails(formData).subscribe(
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
