import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RankingMedalService } from '../services/rankingMedal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ranking-medal-modal',
  templateUrl: './ranking-medal-modal.component.html',
  styleUrls: ['./ranking-medal-modal.component.scss']
})
export class RankingMedalModalComponent implements OnInit {

  formGroup: FormGroup;
  constructor( private fb: FormBuilder,
    public modal: NgbActiveModal, public rankingMedalService: RankingMedalService, 
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      medal_image: ["", Validators.required],
      medal_card: ["", Validators.required],
      view: ["", Validators.required],
    });
  }

  save(){
    const formData = new FormData();
    formData.append("name", this.formGroup.get("name").value);
    formData.append("views", this.formGroup.get("view").value);
    formData.append("medal_image", this.formGroup.get("medal_image").value);
    formData.append("medal_card", this.formGroup.get("medal_card").value);
    this.rankingMedalService.saveRankingMedalDetails(formData)
      .subscribe((data:any) => {
        console.log(data)
        if(data.statusCode === 200){
          this.toastr.success(data.message, 'Success')
          this.modal.close('Close click');
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

  
  uploadFile(key, event) {
    if (key == "medal_card")
      this.formGroup.patchValue({
        image: <File>event.target.files[0],
      });
    else if (key == "medal_image")
      this.formGroup.patchValue({
        image: <File>event.target.files[0],
      });
    this.formGroup.get(key).updateValueAndValidity();
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
