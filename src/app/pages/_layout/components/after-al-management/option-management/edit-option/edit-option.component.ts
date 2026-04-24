import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { ActivatedRoute } from '@angular/router';
import { OptionService } from '../service/option.service';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from '../../institute-management/service/institute.service';
import { CategoryService } from '../../categories-management/service/category.service';

@Component({
  selector: 'app-edit-option',
  templateUrl: './edit-option.component.html',
  styleUrls: ['./edit-option.component.scss']
})
export class EditOptionComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
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
    "video",
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

  instituteObj: any;
  categoryObj: any;

  constructor(
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private optionService: OptionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    // private vodEnrollService: VodEnrollService,
    public instituteService: InstituteService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      video: ["", Validators.required],
      after_al_category_id: ["", Validators.required],
      institute_id: ["", Validators.required],
      status: ["", Validators.required],
     });

    this.formGroup2 = this.fb.group({
      pdf_file: ["", Validators.required],
    });

    this.formGroup3 = this.fb.group({
      banner: ["", Validators.required],
    });

    this.formGroup4 = this.fb.group({
      thumbnail: ["", Validators.required],
    });

    this.id = this.route.snapshot.params.id;
    this.optionService.getOptionById(this.id).subscribe((data: any) => {
      console.log(data);
      this.vidoeResponse = data.data;
      this.formGroup.get("video").setValue(this.vidoeResponse.video_link);
      this.formGroup.get("after_al_category_id").setValue(this.vidoeResponse.after_al_category.id);
      this.formGroup.get("institute_id").setValue(this.vidoeResponse.institute.id);
      this.formGroup.get('status').setValue(this.vidoeResponse.status);
      this.cdr.markForCheck();
    });
    this.getInstitute([{ status: "ACTIVE" }], 1000, 0);
    this.getCategory([{ status: "ACTIVE" }], 1000, 0);
  }

  getInstitute(filter: any, limit: number, skip: number) {
    this.instituteService.getAllInstitue(filter, limit, skip).subscribe(
      (intitituteList: any) => {
        this.instituteObj = intitituteList.data.results;
        console.log(this.instituteObj, intitituteList)
        this.cdr.markForCheck();
      },
      (error) => {
        console.log(error); // The error is here
      }
    );
  }

  getCategory(filter: any, limit: number, skip: number) {
    this.categoryService.getAllCategory(filter, limit, skip).subscribe(
      (categoryList: any) => {
        this.categoryObj = categoryList.data.results;
        console.log(this.categoryObj,categoryList)
        this.cdr.markForCheck();
      },
      (error) => {
        console.log(error); // The error is here
      }
    );
  }

  // getEnrolls(filter: any, limit: number, skip: number) {
  //   this.vodEnrollService.getVodEnroll(filter, limit, skip).subscribe(
  //     (list: any) => {
  //       this.vodEnrollObj = list.data.results;
  //       this.pagination_data2.total = list.data.pagination.total;
  //       this.dataSource2 = this.vodEnrollObj;

  //       this.cdr.markForCheck();
  //       console.log(this.dataSource2);
  //     },
  //     (error) => {
  //       // this.toastr.warning("Something went wrong.", "Error!");
  //       console.log(error); // The error is here
  //     }
  //   );
  // }

  uploadFile(key, event) {
    if (key == "banner") {
      this.formGroup3.patchValue({
        banner: <File>event.target.files[0],
      });
      this.formGroup3.get(key).updateValueAndValidity();
    }
    if (key == "pdf_file") {
      this.formGroup2.patchValue({
        pdf_file: <File>event.target.files[0],
      });
      this.formGroup2.get(key).updateValueAndValidity();
    }
    if (key == "thumbnail") {
      this.formGroup4.patchValue({
        thumbnail: <File>event.target.files[0],
      });
      this.formGroup4.get(key).updateValueAndValidity();
    }
  }

  updateBanner() {
    const formData = new FormData();
    formData.append("banner", this.formGroup3.get("banner").value);
    this.updateService(formData);
  }

  updateThumb() {
    const formData = new FormData();
    formData.append("thumbnail", this.formGroup4.get("thumbnail").value);
    this.updateService(formData);
  }


  updatePDF() {
    const formData = new FormData();
    formData.append("pdf", this.formGroup2.get("pdf_file").value);
    this.updateService(formData);
  }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  updateService(formData: any) {
    this.submitting = true;
    this.optionService.updateOptionDetails(formData, this.id).subscribe(
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

    formData.append("video", this.formGroup.get("video").value);
    formData.append("after_al_category_id", this.formGroup.get("after_al_category_id").value);
    formData.append("institute_id", this.formGroup.get("institute_id").value);
    formData.append('status', this.formGroup.get('status').value);
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
    // this.getEnrolls(
    //   [{ teacherid: this.id }],
    //   event.pageSize,
    //   event.pageIndex * event.pageSize
    // );
  }
}
