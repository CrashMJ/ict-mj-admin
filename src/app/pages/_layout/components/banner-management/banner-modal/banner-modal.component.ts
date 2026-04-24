import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from '../services/banner.service';

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.scss']
})
export class BannerModalComponent implements OnInit {

  isLoading$;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  fileToUpload: File = null;
  submitting= false;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      image: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  uploadFile(key, event) {
    if(key == 'image')
      this.formGroup.patchValue({
        image: <File>event.target.files[0]
      });
    this.formGroup.get(key).updateValueAndValidity();
  }

  save() {
    const formData = new FormData();
    formData.append('type', this.formGroup.get('type').value);
    formData.append('status',this.formGroup.get('status').value);
    formData.append('url',this.formGroup.get('url').value);
    formData.append('description', this.formGroup.get('description').value);
    formData.append('image', this.formGroup.get('image').value);
    
   this.submitting = true;
    this.bannerService
    .saveBannerDetails(formData)
    .subscribe((data:any) => {
      this.submitting = false;
      if(data.statusCode === 200){
        this.toastr.success(data.message, 'Success')
      }
      else if(data.statusCode === 400){
        this.toastr.warning(data.message, 'Warning')
      }
      else{
        this.toastr.warning('Something Went Wrong', 'Error!')
      }
      this.modal.close('Close click');
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
