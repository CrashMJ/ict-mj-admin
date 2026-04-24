import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit {
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
    private settingService: SettingService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      key: ["", Validators.required],
      value: ["", Validators.required],
    });
  }

  

  get f() {
    return this.formGroup.controls;
  }


  save() {
    var formData: any = new FormData();
    formData.append("key", this.f.key.value);
    formData.append("value", this.f.value.value);
    this.submitting = true;
    this.settingService.saveSettingDetails(formData).subscribe(
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



  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
