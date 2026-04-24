import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../../../video-management/services/video.service';
import { InstituteService } from '../../institute-management/service/institute.service';
import { CategoryService } from '../../categories-management/service/category.service';
import { OptionService } from '../service/option.service';

@Component({
  selector: 'app-option-modal',
  templateUrl: './option-modal.component.html',
  styleUrls: ['./option-modal.component.scss']
})
export class OptionModalComponent implements OnInit {
  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  submitting = false;
  // imageToUpload: File = null;

  instituteObj: any;
  categoryObj: any;
  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private optionService: OptionService,
    
    public instituteService: InstituteService,
    public categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      video_link: ["", Validators.required],
      after_al_category_id: ["", Validators.required],
      institute_id: ["", Validators.required],
      pdf: ["", Validators.required],
      banner: ["", Validators.required],
      thumbnail: ["", Validators.required],
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

  get f() {
    return this.formGroup.controls;
  }

  uploadFile(key, event) {
    if (key == "pdf")
      this.formGroup.patchValue({
        pdf: <File>event.target.files[0],
      });
    else if (key == "banner")
      this.formGroup.patchValue({
        banner: <File>event.target.files[0],
      });
    else if (key == "thumbnail")
      this.formGroup.patchValue({
        thumbnail: <File>event.target.files[0],
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    const formData = new FormData();
    
    formData.append("video_link", this.formGroup.get("video_link").value);
    formData.append("after_al_category_id", this.formGroup.get("after_al_category_id").value);
    formData.append("institute_id", this.formGroup.get("institute_id").value);
    formData.append("pdf", this.formGroup.get("pdf").value);
    formData.append("banner", this.formGroup.get("banner").value);
    formData.append("thumbnail", this.formGroup.get("thumbnail").value);

    this.submitting = true;
    this.optionService.saveOptionDetails(formData).subscribe(
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
