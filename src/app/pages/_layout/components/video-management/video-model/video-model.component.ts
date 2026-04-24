import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { VideoService } from "src/app/pages/_layout/components/video-management/services/video.service";
import { ToastrService } from "ngx-toastr";
import { TeacherService } from "../../teacher-management/services/teacher.service";
@Component({
  selector: "app-video-model",
  templateUrl: "./video-model.component.html",
  styleUrls: ["./video-model.component.scss"],
})
export class VideoModelComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  submitting = false;
  // imageToUpload: File = null;
  teacherObj: any;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    public videoService: VideoService,
    public teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.getTeachers([{ status: "ACTIVE" }], 1000, 0);
    this.formGroup = this.fb.group({
      videoCode: ["", Validators.required],
      duration: [""],
      medium: ["", Validators.required],
      videoTitle: ["", Validators.required],
      price: ["149", Validators.required],
      subTitle: [""],
      description: [""],
      videoLink: ["", Validators.required],
      previewVideoLink: ["", Validators.required],
      module_name: ["", Validators.required],
      teacher: ["", Validators.required],
      grade: ["", Validators.required],
      tute: [""],
      thumbnail: ["", Validators.required],
    });
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
    var formData: any = new FormData();
    formData.append("video_code", this.f.videoCode.value);
    formData.append("duration", this.f.duration.value);
    formData.append("medium", this.f.medium.value);
    formData.append("title", this.f.videoTitle.value);
    formData.append("preview_video_link", this.f.previewVideoLink.value);
    formData.append("module_name", this.f.module_name.value);
    formData.append("sub_title", this.f.subTitle.value);
    formData.append("description", this.f.description.value);
    formData.append("video_link", this.f.videoLink.value);
    formData.append("teacher", this.f.teacher.value);
    formData.append("grade", this.f.grade.value);
    if(this.f.tute.value){
      formData.append("tute", this.f.tute.value);
    }
    
    formData.append("thumbnail", this.f.thumbnail.value);
    formData.append("price", this.f.price.value);
    this.submitting = true;
    this.videoService.saveVideoDetails(formData).subscribe(
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
