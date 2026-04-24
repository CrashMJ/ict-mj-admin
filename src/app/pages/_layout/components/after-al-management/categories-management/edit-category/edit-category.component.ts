import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LayoutService } from 'src/app/_metronic/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  id:any;
  imageResponse:any;
  fileToUpload:any;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;

  submitting= false;
  
  constructor(private layout: LayoutService, private el: ElementRef,
    private fb: FormBuilder,private route: ActivatedRoute,public categoryService: CategoryService,private cdr: ChangeDetectorRef,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      status: ["", Validators.required],
   });
    this.formGroup2 = this.fb.group({
      image: ['', Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.categoryService.getCategoryById(this.id).subscribe((data:any)=>{
      this.imageResponse = data.data;
      this.formGroup.get('name').setValue(this.imageResponse.name);
      this.formGroup.get('status').setValue(this.imageResponse.status);
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
    this.categoryService
    .updateCategoryDetails(formData, this.id)
    .subscribe((data:any) => {
      this.submitting = false;
      this.imageResponse = data.data;
      this.cdr.markForCheck();
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
    formData.append('name', this.formGroup.get('name').value);
    formData.append('status', this.formGroup.get('status').value);
    this.updateService(formData);
  }

  updateImage() {
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
