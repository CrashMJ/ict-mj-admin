import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../services/banner.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  id:any;
  bannerResponse:any;
  fileToUpload:any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  submitting= false;
  
  constructor(private layout: LayoutService, private el: ElementRef,
    private fb: FormBuilder,private route: ActivatedRoute,public bannerService: BannerService,private cdr: ChangeDetectorRef,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      description: ['', Validators.required],
      url: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.formGroup2 = this.fb.group({
      image: ['', Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.bannerService.getBannerById(this.id).subscribe((data:any)=>{
      this.bannerResponse = data.data;
      this.formGroup.get('description').setValue(this.bannerResponse.description);
      this.formGroup.get('url').setValue(this.bannerResponse.url);
      this.formGroup.get('status').setValue(this.bannerResponse.status);
      this.formGroup.get('type').setValue(this.bannerResponse.type);
      this.cdr.markForCheck();
    },error=>{
    });
  }

  uploadFile(key, event) {
    if(key == 'image')
      this.formGroup2.patchValue({
        image: <File>event.target.files[0]
      });
    this.formGroup2.get(key).updateValueAndValidity();
  }

  updateService(formData:any){
    this.submitting = true;
    this.bannerService
    .editBannerDetails(formData, this.id)
    .subscribe((data:any) => {
      this.submitting = false;
      this.bannerResponse = data.data;
      this.cdr.markForCheck();
      console.log(this.bannerResponse)
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
    },
      err=>{
        this.submitting = false;
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
      }
    );
   }

  setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return '';
    }

    return 'active';
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
    const elements = this.el.nativeElement.querySelectorAll('.example');
    // KTLayoutExamples.init(elements);
  }


  save() {
    const formData = new FormData();
    formData.append('type', this.formGroup.get('type').value);
    formData.append('status',this.formGroup.get('status').value);
    formData.append('url',this.formGroup.get('url').value);
    formData.append('description', this.formGroup.get('description').value);
    this.updateService(formData);
  }

  updateBanner() {
    const formData = new FormData();
    formData.append('image',this.formGroup2.get('image').value);
    this.updateService(formData);
   }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
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
