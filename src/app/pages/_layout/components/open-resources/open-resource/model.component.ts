import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ORService } from "../services/service";
import { SubjectService } from "../../subject-management/services/subject.service";

@Component({
  selector: "app-open-resource-model",
  templateUrl: "./model.component.html",
  styleUrls: ["./model.component.scss"],
})
export class OpenResourceModelComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  subjectObj: any;
  searchArray: any = [];

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public oRService: ORService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService
  ) {
    this.getDataCourses(this.searchArray, 100, 0);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      class_type: ["", Validators.required],
      grade: ["", Validators.required],
      url: ["", Validators.required],
      medium: ["", Validators.required],
      title: ["", Validators.required],
      description: ["", Validators.required],
      type: ["", Validators.required],
    });
  }

  getDataCourses(filter: any, limit: number, skip: number) {
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

  save() {
    this.oRService
      .create({
        class_type: this.formGroup.get("class_type").value,
        grade: this.formGroup.get("grade").value,
        medium: this.formGroup.get("medium").value,
        url: this.formGroup.get("url").value,
        title: this.formGroup.get("title").value,
        description: this.formGroup.get("description").value,
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
          }
        },
        (err) => {
          if (err.error.message) {
            this.toastr.error(err.message, "Error");
          }
          this.toastr.error(JSON.stringify(err.error), "Error");
        }
        // console.log(user)
      );
  }

  uploadFile(key, event) {
    this.formGroup.patchValue({
      slip: <File>event.target.files[0],
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
