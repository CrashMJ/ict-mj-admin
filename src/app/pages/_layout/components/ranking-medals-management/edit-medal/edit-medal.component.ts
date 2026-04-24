import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RankingMedalService } from '../services/rankingMedal.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-medal',
  templateUrl: './edit-medal.component.html',
  styleUrls: ['./edit-medal.component.scss']
})
export class EditMedalComponent implements OnInit {

  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  medalResponse:any;
  id: any;
  activeTabId = 1;
  STORAGE_BUCKET = environment.STORAGE_BUCKET;
  constructor(
    private fb: FormBuilder,
    private rankingMedalService: RankingMedalService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      view: ["", Validators.required],
    });
    this.formGroup2 = this.fb.group({
      medal_image: ['', Validators.required],
    });
   
    this.formGroup3 = this.fb.group({
      medal_card: ['', Validators.required],
    });
    this.rankingMedalService.getMedalById(this.id).subscribe(
      (data:any) => {
        this.medalResponse = data.data;
        this.formGroup.get("name").setValue(this.medalResponse.name);
        this.formGroup.get("view").setValue(this.medalResponse.views);
      },
      (error) => {
      }
    );
  }

  save() {
    const formData = new FormData();
    formData.append("name", this.formGroup.get("name").value);
    formData.append("views", this.formGroup.get("view").value);
    this.updateService(formData);
  }

  uploadFile(key, event) {
    if (key == "medal_image"){
      this.formGroup2.patchValue({
        medal_image: <File>event.target.files[0],
      });
      this.formGroup2.get(key).updateValueAndValidity();
    }
      
    if (key == "medal_card"){
      this.formGroup3.patchValue({
        medal_card: <File>event.target.files[0],
      });
      this.formGroup3.get(key).updateValueAndValidity();
    }
     
  }


  updateService(formData){
    this.rankingMedalService.updateMedalDetails(formData, this.id)  .subscribe((data:any) => {
      this.medalResponse =data.data;
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
        if(err.error && err.error.message){
          this.toastr.error(err.error.message, 'Error');
          this.toastr.error(JSON.stringify(err.error.errors), 'Error');
        }
        else
          this.toastr.warning('Something Went Wrong', 'Error!')
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

  
  isControlValid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid2(controlName: string): boolean {
    const control = this.formGroup2.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

   
   updateImage() {
    const formData = new FormData();
    formData.append('medal_image',this.formGroup2.get('medal_image').value);
    this.updateService(formData);
   }

   updateImage3() {
    const formData = new FormData();
    formData.append('medal_card',this.formGroup3.get('medal_card').value);
    this.updateService(formData);
   }

   setActiveTab(tabId: number) {
    this.activeTabId = tabId;
  }

  
  getActiveTabCSSClass(tabId: number) {
    if (tabId !== this.activeTabId) {
      return "";
    }

    return "active";
  }
}
