import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { LayoutService } from "src/app/_metronic/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VideoService } from "../services/video.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { EmbedVideoService } from "ngx-embed-video";
import { VodEnrollService } from "../../vod-enrollments/services/vod-enroll.service";
import { TeacherService } from "../../teacher-management/services/teacher.service";

@Component({
  selector: "app-edit-video",
  templateUrl: "./edit-video.component.html",
  styleUrls: ["./edit-video.component.scss"],
})
export class EditVideoComponent implements OnInit {
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

  displayedColumns2: string[] = [
    "id",
    "video_id",
    "video_price",
    "video_code",
    "student_id",
    "name",
    "email",
    "phone",
    "status",
    "created_at",
    "action",
  ];
  dataSource2: any;
  pagination_item_counts2 = environment.pagination_item_counts;
  pagination_data2 = environment.pagination_data;

  teacherObj: any;

  constructor(
    private embedService: EmbedVideoService,
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private videoService: VideoService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private vodEnrollService: VodEnrollService,
    public teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      video_code: ["", Validators.required],
      duration: ["", Validators.required],
      medium: ["", Validators.required],
      title: ["", Validators.required],
      sub_title: [""],
      description: [""],
      video_link: ["", Validators.required],
      price: ["", Validators.required],
      preview_video_link: ["", Validators.required],
      module_name: ["", Validators.required],
      teacher: ["", Validators.required],
      grade: ["", Validators.required],
      status: ["", Validators.required],
    });

    this.formGroup2 = this.fb.group({
      tute: ["", Validators.required],
    });

    this.formGroup3 = this.fb.group({
      thumbnail: ["", Validators.required],
    });

    this.id = this.route.snapshot.params.id;
    this.videoService.getVideoById(this.id).subscribe((data: any) => {
      console.log(data);
      this.vidoeResponse = data.data;
      this.vimeo_iframe_html = this.embedService.embed(
        "https://vimeo.com/" + this.vidoeResponse.video_link + "/9411056d4b"
      );
      this.formGroup.get("video_code").setValue(this.vidoeResponse.video_code);
      this.formGroup.get("duration").setValue(this.vidoeResponse.duration);
      this.formGroup.get("medium").setValue(this.vidoeResponse.medium);
      this.formGroup.get("title").setValue(this.vidoeResponse.title);
      this.formGroup.get("sub_title").setValue(this.vidoeResponse.sub_title);
      this.formGroup
        .get("module_name")
        .setValue(this.vidoeResponse.module_name);
      this.formGroup.get("video_link").setValue(this.vidoeResponse.video_link);
      this.formGroup
        .get("description")
        .setValue(this.vidoeResponse.description);
      this.formGroup
        .get("preview_video_link")
        .setValue(this.vidoeResponse.preview_video_link);
      this.formGroup.get("teacher").setValue(this.vidoeResponse.teacher.id);
      this.formGroup.get("grade").setValue(this.vidoeResponse.grade);
      this.formGroup.get("price").setValue(this.vidoeResponse.price);
      this.formGroup.get("status").setValue(this.vidoeResponse.status);
      this.cdr.markForCheck();
    });
    this.getEnrolls([{ videoid: this.id }], this.pagination_data2.limit, 0);
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
    this.vodEnrollService.getVodEnroll(filter, limit, skip).subscribe(
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
    if (key == "thumbnail") {
      this.formGroup3.patchValue({
        thumbnail: <File>event.target.files[0],
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
    formData.append("thumbnail", this.formGroup3.get("thumbnail").value);
    this.updateService(formData);
  }

  updateTute() {
    const formData = new FormData();
    formData.append("tute", this.formGroup2.get("tute").value);
    this.updateService(formData);
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  updateService(formData: any) {
    this.submitting = true;
    this.videoService.updateVideoDetails(formData, this.id).subscribe(
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

  save() {
    const formData = new FormData();

    formData.append("video_code", this.formGroup.get("video_code").value);
    formData.append("duration", this.formGroup.get("duration").value);
    formData.append("medium", this.formGroup.get("medium").value);
    formData.append("price", this.formGroup.get("price").value);
    formData.append("title", this.formGroup.get("title").value);
    formData.append("teacher", this.formGroup.get("teacher").value);
    formData.append("sub_title", this.formGroup.get("sub_title").value);
    formData.append("description", this.formGroup.get("description").value);
    formData.append("video_link", this.formGroup.get("video_link").value);
    formData.append(
      "preview_video_link",
      this.formGroup.get("preview_video_link").value
    );
    formData.append("grade", this.formGroup.get("grade").value);
    formData.append("module_name", this.formGroup.get("module_name").value);
    formData.append("status", this.formGroup.get("status").value);

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
