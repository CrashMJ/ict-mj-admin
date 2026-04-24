import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from 'src/app/_metronic/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss']
})
export class EditNotificationComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  activeTabId = 1;
  formGroup: FormGroup;
  id:any;
  notificationResponse:any;
  constructor(private layout: LayoutService, private el: ElementRef,
    private fb: FormBuilder,private notificationService: NotificationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.model = this.layout.getConfig();
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      target: ['', Validators.required],
      description: ['', Validators.required],
      area: ['', Validators.required],
      stream: ['', Validators.required],
      year: ['', Validators.required],
    });
    this.id = this.route.snapshot.params.id;
    this.notificationService.getNotificationById(this.id).subscribe(data=>{
      console.log(data);
      this.notificationResponse =data;
      let notificationObj = this.notificationResponse.data;
      this.formGroup.get('title').setValue(notificationObj.title);
      this.formGroup.get('type').setValue(notificationObj.type);
      this.formGroup.get('target').setValue(notificationObj.target);
      this.formGroup.get('description').setValue(notificationObj.description);
      this.formGroup.get('area').setValue(notificationObj.title);
      this.formGroup.get('stream').setValue(notificationObj.title);
      this.formGroup.get('year').setValue(notificationObj.title);
    })
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
  save() { }


  getPic() {
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

}
