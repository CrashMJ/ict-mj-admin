import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SubjectService } from "../services/subject.service";

@Component({
  selector: "app-material-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class MaterialModelComponent implements OnInit {
  @Input() id: number;
  @Input() materialId: number;
  classDetails:any;
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
    console.log(this.id);
    this.formGroup = this.fb.group({
      title_en: ["", Validators.required],
      description_en: ["", Validators.required],
      url: ["", Validators.required],
      module_id: ["", Validators.required],
      course_id: [this.id, Validators.required],
      type: ["document", Validators.required],
    });

    if(this.materialId){
      this.subjectService
      .getMaterialDetailById(this.materialId)
      .subscribe(
        (data:any) => {
          console.log(data);
          if (data.statusCode === 200) {
            this.classDetails = data.data;
            this.formGroup.get("title_en").setValue(this.classDetails.title_en);
            this.formGroup.get("description_en").setValue(this.classDetails.description_en);
            this.formGroup.get("url").setValue(this.classDetails.url);
            this.formGroup.get("module_id").setValue(this.classDetails.module_id);
            this.formGroup.get("course_id").setValue(this.classDetails.course_id);
            this.formGroup.get("type").setValue(this.classDetails.type);

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
    if(this.materialId){
      this.subjectService
      .updateMaterialDetails({
        title_en: this.formGroup.get("title_en").value,
        title_sn: "",
        description_en: this.formGroup.get("description_en").value,
        description_sn: "",
        url: this.formGroup.get("url").value,
        module_id: this.formGroup.get("module_id").value,
        course_id: this.formGroup.get("course_id").value,
        type: this.formGroup.get("type").value,
      },this.materialId)
      .subscribe(
        (data) => {
          console.log(data.statusCode);
          if (data.statusCode === 200) {
            this.toastr.success(data.message, "Success");
            this.modal.close("Close click");
          } else if (data.statusCode === 400) {
            this.toastr.warning(data.message, "Warning");
          } else if (data.statusCode && data.message) {
            this.toastr.warning(data.message, "Warning");
          } else {
            this.toastr.warning(data.message, "Warning");
          }
        },
        (err) => {
          if (err.error.statusCode && err.error.message) {
            this.toastr.warning(err.error.message, "Warning");
          } else {
            this.toastr.warning("Something went wrong!", "Warning");
          }
        }
        // console.log(user)
      );
    } else{
      this.subjectService
      .saveMaterialDetails({
        title_en: this.formGroup.get("title_en").value,
        title_sn: "",
        description_en: this.formGroup.get("description_en").value,
        description_sn: "",
        url: this.formGroup.get("url").value,
        module_id: this.formGroup.get("module_id").value,
        course_id: this.formGroup.get("course_id").value,
        type: this.formGroup.get("type").value,
      })
      .subscribe(
        (data) => {
          console.log(data.statusCode);
          if (data.statusCode === 200) {
            this.toastr.success(data.message, "Success");
            this.modal.close("Close click");
          } else if (data.statusCode === 400) {
            this.toastr.warning(data.message, "Warning");
          } else if (data.statusCode && data.message) {
            this.toastr.warning(data.message, "Warning");
          } else {
            this.toastr.warning(data.message, "Warning");
          }
        },
        (err) => {
          if (err.error.statusCode && err.error.message) {
            this.toastr.warning(err.error.message, "Warning");
          } else {
            this.toastr.warning("Something went wrong!", "Warning");
          }
        }
        // console.log(user)
      );
    }
   
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      file: <File>event.target.files[0],
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
