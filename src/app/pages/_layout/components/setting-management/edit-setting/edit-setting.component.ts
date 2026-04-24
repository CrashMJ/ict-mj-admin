import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { SettingService } from '../services/setting.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EmbedVideoService } from 'ngx-embed-video';
import { LayoutService } from 'src/app/_metronic/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  model: any;
  @ViewChild("form", { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  id: any;
  submitting = false;
  settingResponse:any;
  constructor(
    private embedService: EmbedVideoService,
    private layout: LayoutService,
    private el: ElementRef,
    private fb: FormBuilder,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    // this.formGroup = this.fb.group({
    //   text_en: [""],
    //   text_sn: [""],
    //   url: [""],
    //   asset: [""],
    // });

    this.id = this.route.snapshot.params.id;
    this.settingService.getSettingById(this.id).subscribe((data: any) => {
      console.log(data);

      this.settingResponse = data.data;
      if(this.settingResponse.type=='url'){
        this.formGroup = this.fb.group({
          url: [""],
        });
        this.formGroup.get("url").setValue(this.settingResponse.url);
      }

      this.cdr.markForCheck();
    });
  }



  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  updateService(formData: any) {
    this.submitting = true;
    this.settingService.updateSettingDetails(formData, this.id).subscribe(
      (data: any) => {
        this.submitting = false;
        this.settingResponse = data.data;
        this.cdr.markForCheck();
        console.log(this.settingResponse);
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
    const formData = {
      url: this.formGroup.get("url").value,
      text_en: this.formGroup.get("text_en").value,
      text_sn: this.formGroup.get("text_sn").value,
    };

    this.updateService(formData);
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
